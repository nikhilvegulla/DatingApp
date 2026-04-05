namespace API.Errors;

public class ApiException
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string? Details { get; set; }
    public ApiException(int statusCode, string message, string details)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        Details = details;
    }
    private string GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "Not a good request",
            401 => "You are not authorized",
            404 => "Resource not found",
            500 => "Server error",
            _ => "An error occurred"
        };
    }
}
