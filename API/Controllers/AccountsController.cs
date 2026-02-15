using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountsController(AppDbContext context, ITokenService tokenService): BaseApiController
    {
        [HttpPost("register")]  // /api/accounts/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            if (await this.isEmailExists(registerDto.Email))
            {
                return BadRequest("Email is alreay taken");
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user.ToUserDto(tokenService);
        }

        [HttpPost("login")] 
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(user => user.Email.ToLower().Equals(loginDto.Email.ToLower()));

            if(user == null)
            {
                return Unauthorized("No user found");
            }
            var hmac = new HMACSHA512(user.PasswordSalt);
            var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (var i = 0; i < computerHash.Length; i++) {
                if (computerHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("InCorrect Password");
                }
            }

            return user.ToUserDto(tokenService);
        }
        private async Task<bool> isEmailExists(string email)
        {
            return await context.Users.AnyAsync(user => user.Email.ToLower() == email.ToLower());
        }
    }
}
