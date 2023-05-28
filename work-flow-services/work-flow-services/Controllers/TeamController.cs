using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Team>> GetTeamsByUserId(string id)
        {
            try
            {
                var teams = _context.Teams.Where(t => t.CreatorId == id).ToList();

                return Ok(new { data = teams });
            }
            catch (Exception ex)
            {
                var errorMessage = new { message = "Internal server error", error = ex.ToString() };

                return StatusCode(500, errorMessage);
            }
        }

        [HttpPost("createTeam")]
        public async Task<IActionResult> CreateTeam(Team request)
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
                    CreatedAt = request.CreatedAt,
                    UpdatedAt = request.CreatedAt
                };

                _context.Teams.Add(team);
                await _context.SaveChangesAsync();

                // I may add isSucesss later
                return Ok(new { message = "Team has been added succesfully" });
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex} ");
            }
        }
      
    }
}
