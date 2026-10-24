using App.Api.Data;
using App.Api.DTOs.Requests;
using App.Api.DTOs.Responses;
using App.Api.Exceptions;
using App.Api.Models;
using App.Api.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Api.Controllers;

[ApiController]
[Route("[controller]/")]
public class NotesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await db.Notes
            .OrderByDescending(x => x.UpdatedAt ?? x.CreatedAt)
            .ThenByDescending(x => x.Id)
            .Select(x => new NoteResponse
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .ToListAsync();

        return Ok(notes);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetNoteById(int id)
    {
        var note = await db.Notes
            .Select(x => new NoteResponse
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt
            })
            .SingleOrDefaultAsync(x => x.Id == id) 
            ?? throw new AppException(404, ErrorCodes.NoteNotFound);
        return Ok(note);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNote([FromForm] CreateNoteRequest createRequest)
    {
        var note = new Note
        {
            Title = createRequest.Title,
            Content = createRequest.Content,
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Notes.Add(note);
        await db.SaveChangesAsync();

        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateNoteById(int id, [FromForm] CreateNoteRequest input)
    {
        var note = await db.Notes.SingleOrDefaultAsync(x => x.Id == id) 
            ?? throw new AppException(404, ErrorCodes.NoteNotFound);

        note.Title = input.Title;
        note.Content = input.Content;
        note.UpdatedAt = DateTimeOffset.UtcNow;

        await db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteNoteById(int id)
    {
        var note = await db.Notes.SingleOrDefaultAsync(x => x.Id == id)
            ?? throw new AppException(404, ErrorCodes.NoteNotFound);

        db.Notes.Remove(note);
        await db.SaveChangesAsync();

        return NoContent();
    }
}