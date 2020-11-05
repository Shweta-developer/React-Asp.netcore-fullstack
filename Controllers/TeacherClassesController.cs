using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication9.Entities;
using WebApplication9.Helpers;

namespace WebApplication9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherClassesController : ControllerBase
    {
        private readonly DataContext _context;

        public TeacherClassesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TeacherClasses
       /* [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherClass>>> GetTeacherClasses()
        {
            return await _context.TeacherClasses.ToListAsync();
        }

        // GET: api/TeacherClasses*/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherClass>>> GetTeacherClassesjoin()
        {
            return await _context.TeacherClasses.Include(s => s.Teacher)
                        .Include(s => s.ClassInfo).ThenInclude(c=>c.SchoolYear)
                        .ToListAsync();
        }

        // GET: api/TeacherClasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherClass>> GetTeacherClass(int id)
        {
            var teacherClass = await _context.TeacherClasses.FindAsync(id);

            if (teacherClass == null)
            {
                return NotFound();
            }

            return teacherClass;
        }

        // PUT: api/TeacherClasses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacherClass(int id, TeacherClass teacherClass)
        {
            if (id != teacherClass.TId)
            {
                return BadRequest();
            }

            _context.Entry(teacherClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherClassExists(id))
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

        // POST: api/TeacherClasses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /* [HttpPost]
         public async Task<ActionResult<TeacherClass>> PostTeacherClass(TeacherClass teacherClass)
         {
             _context.TeacherClasses.Add(teacherClass);
             try
             {
                 await _context.SaveChangesAsync();
             }
             catch (DbUpdateException)
             {
                 if (TeacherClassExists(teacherClass.TId))
                 {
                     return Conflict();
                 }
                 else
                 {
                     throw;
                 }
             }

             return CreatedAtAction("GetTeacherClass", new { id = teacherClass.TId }, teacherClass);
         }*/
        [HttpPost]
        public async Task<ActionResult<TeacherClass>> PostTeacherClass(TeacherClassesPost teacherClasspost)
        {
            var result = await _context.ClassInfo.Where(s => s.ClassName == teacherClasspost.ClassName).Select(x => new 
    {
                CId = x.CId
            })
   .SingleOrDefaultAsync();
           
            _context.TeacherClasses.Add(new TeacherClass()
            {
                TId=teacherClasspost.TId,
                CId= result.CId

            });
           
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TeacherClassExists(teacherClasspost.TId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTeacherClass", new { id = teacherClasspost.TId }, teacherClasspost);
        }

        // DELETE: api/TeacherClasses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeacherClass>> DeleteTeacherClass(int id)
        {
            IList<TeacherClass> teacherClass = await _context.TeacherClasses.Where(s => s.CId == id).ToListAsync();
            if (teacherClass == null)
            {
                return NotFound();
            }

            _context.TeacherClasses.RemoveRange(teacherClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeacherClassExists(int id)
        {
            return _context.TeacherClasses.Any(e => e.TId == id);
        }
    }
}
