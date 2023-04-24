using Highdata.Service.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Highdata.Service.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly List<Student> _students;

        public DataController()
        {
            _students = new List<Student>
            {
                new Student("Alice", 20, new List<string>() { "reading", "swimming", "coding" }),
                new Student("Bob", 22, new List<string>() { "paiting", "dancing", "singing" }),
                new Student("Aramis", 22, new List<string>() {"coding" })
            };
        }

        [HttpPost]
        public IEnumerable<Student> PostStudents()
        {
            return _students;
        }

        [HttpGet]
        public IEnumerable<Student> GetStudent(string filter = "")
        {
            if (!string.IsNullOrWhiteSpace(filter))
                return _students.Where(x => x.Name.Contains(filter, StringComparison.InvariantCultureIgnoreCase));

            return _students;
        }
    }
}