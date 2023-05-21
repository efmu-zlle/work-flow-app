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

        [HttpGet("test")]
        public ActionResult<IEnumerable<User>> Test()
        {
            try
            {
                var users = _context.Users.ToList();

                return Ok(new { data = users });
            }
            catch (Exception ex)
            {
                var errorMessage = new { message = "Internal server error", error = ex.ToString() };

                return StatusCode(500, errorMessage);
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var required = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                    return NotFound(required);
                }

                if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                {
                    return Unauthorized(new { messageError = "Username is already taken." });
                }

                if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                {
                    return Unauthorized(new { messageError = "Email is already taken." });
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

                return Ok(new { messageSuccess = "User created successfully."  } );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(UserModel request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var required = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                    return NotFound(required);
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

                var _passwordHasher = new PasswordHasher<User>();
                if (user == null || !_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password).Equals(PasswordVerificationResult.Success))
                {
                    return Unauthorized(new { messageError = "Invalid username or password." });
                }

                user.UpdatedAt = DateTime.Now;

                _context.Users.Update(user); 
                await _context.SaveChangesAsync(); 

                return Ok(new { messageSuccess = "User signed in successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex} ");
            }
        }
    }
}
