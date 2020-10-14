using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class TeacherClass
    {
        public int TId { get; set; }
        public Teacher Teacher { get; set; }

        public int CId { get; set; }
        public Class ClassInfo { get; set; }
    }
}
