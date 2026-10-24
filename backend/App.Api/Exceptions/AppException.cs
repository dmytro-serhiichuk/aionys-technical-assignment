namespace App.Api.Exceptions;

public class AppException(int status, string code, Dictionary<string, string?>? errors = null) : Exception(code)
{
    public int Status { get; } = status;
    public string Code { get; } = code;
    public Dictionary<string, string?>? Errors { get; } = errors;
}