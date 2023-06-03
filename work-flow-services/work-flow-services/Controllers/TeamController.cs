using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using work_flow_data_access.Data;
using work_flow_models;
using work_flow_utils;

namespace work_flow_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TeamController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getTeam/{id}")]
        public ActionResult<IEnumerable<Team>> GetTeamsByUserId(string id)
        {
            try
            {
                var teams = _context.Teams.Where(t => t.CreatorId == id).ToList().OrderBy(o => o.CreatedAt);

                return Ok(new { payload = teams });
            }
            catch (Exception ex)
            {
                var errorMessage = new { message = "Internal server error", error = ex.ToString() };

                return StatusCode(500, errorMessage);
            }
        }

        [HttpPost("createTeam")]
        public IActionResult CreateTeam(Team request)
        {
            try
            {
                // maybe a validation to check whether the userId exists or not
                var team = new Team
                {
                    TeamId = Guid.NewGuid().ToString(),
                    Name = request.Name,
                    Description = request.Description,
                    CreatorId = request.CreatorId,
                    Code = Helper.GenerateCode(),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _context.Teams.Add(team);
                _context.SaveChanges();

                return Ok(new { message = "Team created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex} ");
            }
        }

        [HttpPut("updateTeam")]
        public IActionResult UpdateTeam(Team request)
        {
            try
            {
                var team = _context.Teams.FirstOrDefault(t => t.TeamId == request.TeamId);

                if (team == null)
                {
                    return NotFound();
                }

                team.Name = request.Name;
                team.Description = request.Description;
                team.UpdatedAt = DateTime.Now;

                _context.Teams.Update(team);
                _context.SaveChanges();

                return Ok(new { message = "Team updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: ${ex}");
            }
        }

        [HttpDelete("deleteTeam/{id}")]
        public IActionResult DeleteTeam(string id)
        {
            try
            {
                var team = _context.Teams.FirstOrDefault(t => t.TeamId == id);

                if (team == null)
                {
                    return NotFound();
                }

                _context.Teams.Remove(team);
                _context.SaveChanges();

                return Ok(new { message = "Team deleted successfully" });
            }
            catch (Exception ex)
            {
                var messageError = new { message = "Internal server error", error = ex.ToString() };

                return StatusCode(500, messageError);
            }
        }
      
    }
}
