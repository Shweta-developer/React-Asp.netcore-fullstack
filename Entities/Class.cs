using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class Class
    {
        [Key]
        public int CId { get; set; }
        public string ClassName { get; set; }
        public IList<TeacherClass> TeacherClasses { get; set; }
    }
}
