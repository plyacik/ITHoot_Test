using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectTitle { get; set; }
        public List<ProjectDeveloper> ProjectDevelopers { get; set; }
        public Project()
        {
            ProjectDevelopers = new List<ProjectDeveloper>();
        }
    }

    public class Developer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProjectDeveloper> ProjectDevelopers { get; set; }
        public Developer()
        {
            ProjectDevelopers = new List<ProjectDeveloper>();
        }
    }

    public class ProjectDeveloper
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public int DeveloperId { get; set; }
        public Developer Developer { get; set; }
    }
}
