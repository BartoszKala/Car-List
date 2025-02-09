using System.ComponentModel.DataAnnotations;

namespace Cars.API
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).{12,}$", ErrorMessage = "Password must be at least 12 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character.")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}
