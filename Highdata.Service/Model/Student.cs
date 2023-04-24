namespace Highdata.Service.Model
{
    public class Student
    {
        public Student()
        {
            Hobbies = new List<string>();
        }

        public Student(string name, int age, List<string> hobbies)
        {
            Name = name;
            Age = age;
            Hobbies = hobbies;
        }

        public string Name { get; set; }
        public int Age { get; set; }
        public List<string> Hobbies { get; set; }
    }
}
