using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using work_flow_data_access.Data;
using work_flow_models;

namespace work_flow_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp(User request)
        {
            try
            {
                if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                {
                    return BadRequest(new { message = "Username is already taken." });
                }

                if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                {
                    return BadRequest(new { message = "Email is already taken." });
                }

                var user = new User
                {
                    UserId = Guid.NewGuid().ToString(),
                    Username = request.Username,
                    Email = request.Email,
                    Password = "",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // sending only the data that I need
                var userDTO = new UserResponseDTO
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                return Ok(new { message = "User created successfully.", payload = userDTO } );            
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(UserModel request)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

                var _passwordHasher = new PasswordHasher<User>();
                if (user == null || !_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password).Equals(PasswordVerificationResult.Success))
                {
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                user.UpdatedAt = DateTime.Now;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                var userDTO = new UserResponseDTO
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                return Ok(new { message = "User signed in successfully.", payload = userDTO } );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex} ");
            }
        }
    }
}
