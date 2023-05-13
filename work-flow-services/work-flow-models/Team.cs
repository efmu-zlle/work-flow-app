using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_models
{
    public class Team
    {
        [Key]
        public string TeamId { get; set; }

        [Required(ErrorMessage = "The 'Name' field is required.")]
        public string Name { get; set; }

        public string Description { get; set; }

        public string CreatorId { get; set; }

        public string Code { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }


        [ForeignKey("CreatorId")]
        public User Creator { get; set; }

    }
}
