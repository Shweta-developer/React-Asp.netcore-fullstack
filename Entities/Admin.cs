using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication9.Entities
{
    public class Admin
    {
        [Key]
        public int AId { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string SchoolName { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public string State { get; set; }
        public int AdminUserRef { get; set; }

        public User User { get; set; }
       
    }
}
