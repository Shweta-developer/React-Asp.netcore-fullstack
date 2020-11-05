using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class Student
    {[Key]
        public int SId { get; set; }
        public string email { get; set; }
        public int ClassId { get; set; }
        public Class Classes { get; set; }
        public int StudentUserRef { get; set; }
        public User User { get; set; }
    }
}
