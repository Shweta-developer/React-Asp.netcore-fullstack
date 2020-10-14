using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication9.Entities;
using WebApplication9.Helpers;
using WebApplication9.Services;

namespace WebApplication9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly DataContext _context;

        public TeachersController(DataContext context)
        {
            _context = context;
        }
        /*
        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeacher()
        {
            return await _context.Teacher.ToListAsync();
        }*/
        // GET: api/TeacherUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeacherUsers()
        {
            return await _context.Teacher.Include(s => s.User).ToListAsync();
        }
        /*
        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var teacher = await _context.Teacher.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher;
        }*/
        // GET: api/TeacherUser/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacherUser(int id)
        {
            var teacher = await _context.Teacher.Where(s => s.TId == id)
                           .Include(s => s.User).FirstOrDefaultAsync();

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher;
        }

        // PUT: api/Teachers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(int id, Teacher teacher)
        {
            if (id != teacher.TId)
            {
                return BadRequest();
            }

            _context.Entry(teacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Teachers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
       /* [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
        {
            _context.Teacher.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacher", new { id = teacher.TId }, teacher);
        }*/
        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacherUser(Teacher teacher)
        {
            if (_context.Users.Any(x => x.Username == teacher.User.Username))
                throw new AppException("Username \"" + teacher.User.Username + "\" is already taken");
            String password = "meme";
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            _context.Users.Add(new User()
            {
                FirstName = teacher.User.FirstName,
                LastName = teacher.User.LastName,
                Username=teacher.User.Username,
                PasswordHash= passwordHash,
                PasswordSalt= passwordSalt,
                Role= teacher.User.Role,

            });
            await _context.SaveChangesAsync();
            var user = await _context.Users.Where(s => s.Username == teacher.User.Username)
                           .FirstOrDefaultAsync();
            _context.Teacher.Add(new Teacher()
            {
                Email=teacher.Email,
                TeacherUserRef=user.Id,
                
            });
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacher", new { id = teacher.TId }, teacher);
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Teacher>> DeleteTeacher(int id)
        {
            var teacher = await _context.Teacher.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teacher.Remove(teacher);
            await _context.SaveChangesAsync();

            return teacher;
        }

        private bool TeacherExists(int id)
        {
            return _context.Teacher.Any(e => e.TId == id);
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
