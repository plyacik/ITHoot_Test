using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Service;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectBoardController : ControllerBase
    {
        private readonly ProjectBoardContext _context;
        public ProjectBoardController(ProjectBoardContext context)
        {
            _context = context;
        }

        // GET api/ProjectBoard
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        [Route("AddDeveloper")]
        //POST : /api/ProjectBoard/AddDeveloper
        public async Task<Object> AddDeveloper(AddDeveloperModel model)
        {
            if (model.Name != null)
            {
                Developer developer = new Developer { Name = model.Name };
                await _context.Developers.AddAsync(developer);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Developer name is null." });
            }
        }

        [HttpPost]
        [Route("AddProject")]
        //POST : /api/ProjectBoard/AddProject
        public async Task<Object> AddProject(AddProjectModel model)
        {
            if (model.ProjectTitle != null)
            {
                Project project = new Project { ProjectTitle = model.ProjectTitle };
                await _context.Projects.AddAsync(project);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Project title is null." });
            }
        }

        [HttpPost]
        [Route("EditDeveloper")]
        //POST : /api/ProjectBoard/EditDeveloper
        public async Task<Object> EditDeveloper(EditDeveloperModel model)
        {
            if (model.Name != null)
            {

                Developer developer = _context.Developers.FirstOrDefault(d => d.Id == model.Id);
                if (developer != null)
                {
                    developer.Name = model.Name;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "No developer in database." });
                }
            }
            else
            {
                return BadRequest(new { message = "Developer name is null." });
            }
        }

        [HttpPost]
        [Route("EditProject")]
        //POST : /api/ProjectBoard/EditProject
        public async Task<Object> EditProject(EditProjectModel model)
        {
            if (model.ProjectTitle != null)
            {

                Project project = _context.Projects.FirstOrDefault(p => p.Id == model.Id);
                if (project != null)
                {
                    project.ProjectTitle = model.ProjectTitle;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest(new { message = "No Project in database." });
                }
            }
            else
            {
                return BadRequest(new { message = "Project title is null." });
            }
        }

        [HttpDelete]
        [Route("DeleteDeveloper")]
        //DELETE : /api/ProjectBoard/DeleteDeveloper
        public async Task<Object> DeleteDeveloper(int id)
        {
            Developer developer = _context.Developers.FirstOrDefault(d => d.Id == id);
            if (developer != null)
            {
                _context.Developers.Remove(developer);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "No developer in database." });
            }
        }

        [HttpDelete]
        [Route("DeleteProject")]
        //DELETE : /api/ProjectBoard/DeleteProject
        public async Task<Object> DeleteProject(int id)
        {
            Project project = _context.Projects.FirstOrDefault(p => p.Id == id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "No project in database." });
            }
        }

        [HttpGet]
        [Route("GetDevelopers")]
        //GET : /api/ProjectBoard/GetDevelopers
        public List<DeveloperListModel> GetDevelopers()
        {
            List<DeveloperListModel> developerList = new List<DeveloperListModel>();
            foreach (Developer developer in _context.Developers)
            {
                DeveloperListModel addDeveloper = new DeveloperListModel { Id = developer.Id, Name = developer.Name };
                developerList.Add(addDeveloper);
            }
            return developerList;
        }

        [HttpGet]
        [Route("GetProjects")]
        //GET : /api/ProjectBoard/GetProjects
        public List<ProjectListModel> GetProjects()
        {
            List<ProjectListModel> projectList = new List<ProjectListModel>();
            foreach (Project project in _context.Projects.ToList())
            {
                ProjectListModel addProject = new ProjectListModel { Id = project.Id, ProjectTitle = project.ProjectTitle };
                projectList.Add(addProject);
            }
            return projectList;
        }

        [HttpGet]
        [Route("GetCurrentProjects")]
        //GET : /api/ProjectBoard/GetCurrentProjects
        public ProjectListModel GetCurrentProjects(int id)
        {
            Project project = new Project();
            if (id == 0)
            {
                project = _context.Projects.FirstOrDefault();
            }
            else
            {
                project = _context.Projects.Find(id);
            }
            if (project != null)
            {
                ProjectListModel currProject = new ProjectListModel { Id = project.Id, ProjectTitle = project.ProjectTitle };
                return currProject;
            }
            else
            {
                return new ProjectListModel { Id = 0, ProjectTitle = "No project in database." };
            }
        }

        [HttpGet]
        [Route("GetCurrentDevelopers")]
        //GET : /api/ProjectBoard/GetCurrentProjects
        public Object GetCurrentDevelopers(int id)
        {
            List<DeveloperListModel> developerList = new List<DeveloperListModel>();
            int findId = id;
            if (id == 0)
            {
                findId = _context.Projects.FirstOrDefault().Id;
            }
            var currPrj = _context.Projects.Include(p => p.ProjectDevelopers).ThenInclude(d => d.Developer).FirstOrDefault(pr => pr.Id == findId);
            if (currPrj == null)
            {
                return BadRequest(new { message = "No project in database." });
            }
            var devList = currPrj.ProjectDevelopers.ToList();
            foreach (ProjectDeveloper developer in devList)
            {
                DeveloperListModel addDeveloper = new DeveloperListModel { Id = developer.Developer.Id, Name = developer.Developer.Name };
                developerList.Add(addDeveloper);
            }
            return developerList;
        }

        [HttpPost]
        [Route("AddDeveloperToProject")]
        //POST : /api/ProjectBoard/AddDeveloperToProject
        public async Task<Object> AddDeveloperToProject(AddDevToProjectModel model)
        {
            Project project = _context.Projects.FirstOrDefault(p => p.Id == model.projectId);
            project.ProjectDevelopers.Add(new ProjectDeveloper { ProjectId = model.projectId, DeveloperId = model.developerId });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("DelDeveloperFromProject")]
        //POST : /api/ProjectBoard/DelDeveloperFromProject
        public async Task<Object> DelDeveloperFromProject(AddDevToProjectModel model)
        {
            Project project = await _context.Projects.Include(pd => pd.ProjectDevelopers).FirstOrDefaultAsync(p => p.Id == model.projectId);
            Developer developer = await _context.Developers.FirstOrDefaultAsync(d => d.Id == model.developerId);
            if (project != null && developer != null)
            {
                var projectDeveloper = project.ProjectDevelopers.FirstOrDefault(pd => pd.DeveloperId == developer.Id);
                project.ProjectDevelopers.Remove(projectDeveloper);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "No project or developer in database." });
            }
            
        }
    }
}