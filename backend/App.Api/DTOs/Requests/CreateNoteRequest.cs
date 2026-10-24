using System.ComponentModel.DataAnnotations;
using App.Api.Validation;

namespace App.Api.DTOs.Requests;

public class CreateNoteRequest
{
    [Required(AllowEmptyStrings = false, ErrorMessage = ErrorCodes.NoteTitleRequired)]
    [MaxLength(256, ErrorMessage = ErrorCodes.NoteTitleInvalidMaxLength)]
    public string Title { get; set; } = string.Empty;
    
    [Required(AllowEmptyStrings = false, ErrorMessage = ErrorCodes.NoteContentRequired)]
    [MaxLength(2048, ErrorMessage = ErrorCodes.NoteContentInvalidMaxLength)]
    public string Content { get; set; } = string.Empty;
}