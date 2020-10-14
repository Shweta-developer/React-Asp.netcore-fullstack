using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class Teacher
    {
        [Key]
        public int TId { get; set; }
        public string Email { get; set; }
        public int TeacherUserRef { get; set; }
        public User User { get; set; }
        public IList<TeacherClass> TeacherClasses { get; set; }
    }
}
