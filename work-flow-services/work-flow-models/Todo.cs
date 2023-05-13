using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_models
{
    public class Todo
    {
        [Key]
        public string TodoId { get; set; }

        [Required(ErrorMessage = "The 'Description' field is required")]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string TeamId { get; set; }


        [ForeignKey("TeamId")]
        public Team Team { get; set; }

    }
}
