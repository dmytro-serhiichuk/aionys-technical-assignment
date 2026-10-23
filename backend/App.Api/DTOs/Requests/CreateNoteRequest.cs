using System.ComponentModel.DataAnnotations;

namespace App.Api.DTOs.Requests;

public class CreateNoteRequest
{
    [Required]
    [MaxLength(256)]
    public string Title { get; set; } = string.Empty;
    [Required]
    [MaxLength(2048)]
    public string Content { get; set; } = string.Empty;
}