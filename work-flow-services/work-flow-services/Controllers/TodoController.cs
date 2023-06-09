﻿using Microsoft.AspNetCore.Http;
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
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TodoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getTodosByTeamId/{id}")]
        public ActionResult<IEnumerable<Todo>> GetTodosByTeamId(string id)
        {
            try
            {
                var todos = _context.Todos.Where(t => t.TeamId == id).ToList().OrderBy(t => t.CreatedAt);

                return Ok(new { payload = todos });

            }
            catch (Exception ex)
            {
                var messageError = new { message = "Internal Server error", error = ex.ToString() };
                return StatusCode(500, messageError);
            }
        }

        [HttpPost("createTodo")]
        public IActionResult CreateTodo(Todo request)
        {
            try
            {
                var todo = new Todo
                {
                    TodoId = Guid.NewGuid().ToString(),
                    Title = request.Title,
                    IsCompleted = request.IsCompleted,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    TeamId = request.TeamId,
                };

                _context.Todos.Add(todo);
                _context.SaveChanges();

                return Ok(new { message = "Todo created successfully", payload = todo });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPut("updateTodo/{id}")]
        public IActionResult UpdateTodo(string id, Todo request)
        {
            try
            {
                var todo = _context.Todos.FirstOrDefault(t => t.TodoId == id);

                if (todo == null)
                {
                    return NotFound();
                }

                todo.Title = request.Title;
                todo.IsCompleted = request.IsCompleted;
                todo.UpdatedAt = DateTime.Now;

                _context.Todos.Update(todo);
                _context.SaveChanges();

                return Ok(new { message = "Todo update successfully", payload = todo });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: ${ex}");
            }
        }

        [HttpDelete("deleteTodo/{id}")]
        public IActionResult DeleteTodo(string id)
        {
            try
            {
                var todo = _context.Todos.FirstOrDefault(t => t.TodoId == id);

                if (todo == null)
                {
                    return NotFound();
                }

                _context.Todos.Remove(todo);
                _context.SaveChanges();

                return Ok(new { message = "Todo deleted successfully" });
            }
            catch (Exception ex)
            {
                var messageError = new { message = "Internal server error", error = ex.ToString() };
                return StatusCode(500, messageError);
            }
        }
    }
}
