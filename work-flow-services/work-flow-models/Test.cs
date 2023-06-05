using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace work_flow_models
{
    public class Test
    {
        [Key]
        public string TodoId { get; set; }

        [Required(ErrorMessage = "The 'Title' field is required")]
        public string Title { get; set; }

        public bool IsCompleted { get; set; }
    }
}
