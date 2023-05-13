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
    public class UserController : ControllerBase
    {
        //private readonly ApplicationDbContext _context;

        //public AuthController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}

        //[HttpPost("signup")]
        //public async Task<IActionResult> SignUp(User request)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }

        //        if (await _context.Users.AnyAsync(u => u.Username == request.Username))
        //        {
        //            return BadRequest("Username is already taken.");
        //        }

        //        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        //        {
        //            return BadRequest("Email is already taken.");
        //        }

        //        var user = new User
        //        {
        //            UserId = Guid.NewGuid().ToString(),
        //            Username = request.Username,
        //            Email = request.Email,
        //            CreatedAt = DateTime.UtcNow,
        //            UpdatedAt = DateTime.UtcNow
        //        };

        //        user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);


        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();

        //        return Ok(new { message = "User created successfully." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex}");
        //    }
        //}

        //[HttpPost("signin")]
        //public async Task<IActionResult> SignIn(User request)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }

        //        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

        //        var _passwordHasher = new PasswordHasher<User>();
        //        if (user == null || !_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password).Equals(PasswordVerificationResult.Success))
        //        {
        //            return Unauthorized("Invalid username or password.");
        //        }

        //        return Ok(new { message = "User signed in successfully." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex} ");
        //    }
        //}
    }
}
