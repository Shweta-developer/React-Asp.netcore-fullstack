using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class SchoolYear
    {
        [Key]
        public int YearId { get; set; }
        public int year { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
