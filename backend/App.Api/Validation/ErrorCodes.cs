using System.Reflection;

namespace App.Api.Validation;

public static class ErrorCodes
{
    public const string InvalidRequest = "INVALID_REQUEST";
    public const string Unauthorized = "UNAUTHORIZED";
    public const string Forbidden = "FORBIDDEN";
    public const string ResourceNotFound = "RESOURCE_NOT_FOUND";
    public const string MethodNotAllowed = "METHOD_NOT_ALLOWED";
    public const string ResourceConflict = "RESOURCE_CONFLICT";
    public const string RateLimitExceeded = "RATE_LIMIT_EXCEEDED";
    public const string UnknownError = "UNKNOWN_ERROR";
    public const string InternalServerError = "INTERNAL_SERVER_ERROR";
    public const string InvalidValidation = "INVALID_VALIDATION";
    public const string InvalidValidationMessageNotDefined = "INVALID_VALIDATION_MESSAGE_NOT_DEFINED";
    public const string NoteTitleRequired = "NOTE_TITLE_REQUIRED";
    public const string NoteContentRequired = "NOTE_CONTENT_REQUIRED";
    public const string NoteTitleInvalidMaxLength = "NOTE_TITLE_INVALID_MAX_LENGTH";
    public const string NoteContentInvalidMaxLength = "NOTE_CONTENT_INVALID_MAX_LENGTH";
    public const string NoteNotFound = "NOTE_NOT_FOUND";


    private static readonly HashSet<string> Known = typeof(ErrorCodes)
        .GetFields(BindingFlags.Public | BindingFlags.Static)
        .Where(f => f.IsLiteral)
        .Select(f => (string)f.GetRawConstantValue()!)
        .ToHashSet();

    public static string GetErrorCodeFromStatus(int? status)
    {
        return status switch
        {
            400 => InvalidRequest,
            401 => Unauthorized,
            403 => Forbidden,
            404 => ResourceNotFound,
            405 => MethodNotAllowed,
            409 => ResourceConflict,
            429 => RateLimitExceeded,
            >= 500 => InternalServerError,
            _ => UnknownError
        };
    }

    public static bool IsKnown(string? code) => code is not null && Known.Contains(code);
}