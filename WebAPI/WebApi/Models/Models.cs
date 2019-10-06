using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class AddDeveloperModel
    {
        public string Name { get; set; }
    }
    public class AddProjectModel
    {
        public string ProjectTitle { get; set; }
    }

    public class EditDeveloperModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class EditProjectModel
    {
        public int Id { get; set; }
        public string ProjectTitle { get; set; }
    }

    public class DeveloperListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ProjectListModel
    {
        public int Id { get; set; }
        public string ProjectTitle { get; set; }
    }

    public class AddDevToProjectModel
    {
        public int projectId { get; set; }
        public int developerId { get; set; }
    }
}
