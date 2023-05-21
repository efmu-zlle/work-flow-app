﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_models
{
    public class User
    {
        [Key]
        public string UserId { get; set; }

        [Required(ErrorMessage  = "The 'username' field is required.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "The 'email' field is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The 'password' field is required.")]
        [MinLength(6, ErrorMessage = "password must be at least 6 characters long")]
        public string Password { get; set; }

        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

    }


    public class UserModel
    {
        [Required(ErrorMessage = "The 'username' field is required.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "The 'password' field is required.")]
        [MinLength(6, ErrorMessage = "password must be at least 6 characters long")]
        public string Password { get; set; }
    }
}
