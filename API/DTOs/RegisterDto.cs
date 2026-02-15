using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; } = String.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required]
        [MinLength(4)]
        public string Password { get; set; } = String.Empty;
    }
}
