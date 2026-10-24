using App.Api.Exceptions;
using App.Api.Validation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace App.Api.Services;

public class GlobalExceptionHandler(
    IProblemDetailsService problemDetails, 
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> logger = logger;

    public async ValueTask<bool> TryHandleAsync(HttpContext ctx, Exception ex, CancellationToken cancellationToken)
    {
        if (ex is OperationCanceledException && ctx.RequestAborted.IsCancellationRequested)
            return true;

        var (status, code) = ex switch
        {
            AppException e            => (e.Status, e.Code),
            BadHttpRequestException e => (e.StatusCode, ErrorCodes.GetErrorCodeFromStatus(e.StatusCode)),
            _                         => (500, ErrorCodes.InternalServerError)
        };

        if (status >= 500)
            logger.LogError(ex, "Unhandled exception. TraceId: {TraceId}", ctx.TraceIdentifier);

        ctx.Response.StatusCode = status;
        return await problemDetails.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = ctx,
            ProblemDetails = new ProblemDetails 
            { 
                Status = status, 
                Extensions = { ["code"] = code }
            }
        });
    }
}