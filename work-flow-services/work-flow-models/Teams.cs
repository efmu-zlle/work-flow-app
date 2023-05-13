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
    public class Teams
    {
        [Key]
        public int TeamId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int CreatorId { get; set; }

        public string Code { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }


        [ForeignKey("CreatorId")]
        public Users Creator { get; set; }

    }
}
