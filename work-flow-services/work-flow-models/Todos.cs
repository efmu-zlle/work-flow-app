using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_models
{
    public class Todos
    {
        [Key]
        public int TodoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool isCompleted { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int TeamId { get; set; }


        [ForeignKey("TeamId")]
        public Teams Teams { get; set; }

    }
}
