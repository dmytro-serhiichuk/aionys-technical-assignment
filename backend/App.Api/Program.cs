using System.Text.Json;
using App.Api.Data;
using App.Api.Services;
using App.Api.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails(o =>
    o.CustomizeProblemDetails = c =>
    {
        var p = c.ProblemDetails;
        p.Extensions.TryAdd("code", ErrorCodes.GetErrorCodeFromStatus(p.Status));
        p.Extensions.TryAdd("traceId", c.HttpContext.TraceIdentifier);
    });
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase)
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState.Where(x => x.Value?.Errors.Count > 0).ToDictionary
            (
                x => x.Key,
                x => x.Value!.Errors.Select(e => ErrorCodes.IsKnown(e.ErrorMessage) 
                    ? e.ErrorMessage 
                    : ErrorCodes.InvalidValidationMessageNotDefined
                ).ToArray()
            );

            return new BadRequestObjectResult(new ValidationProblemDetails(errors)
            {
                Status = 400,
                Extensions = { ["code"] = ErrorCodes.InvalidValidation }
            });
        };
    });

var frontendUrl = builder.Configuration["Frontend:Url"] 
    ?? throw new InvalidOperationException("Frontend Url is missing");

builder.Services.AddCors(options =>
{   
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(frontendUrl)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("Frontend");

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();