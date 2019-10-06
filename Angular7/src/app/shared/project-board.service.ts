import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProjectBoardService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44301/api';

  projectFormModel = this.fb.group({
    Id: [null],
    ProjectTitle: ['', Validators.required]
  });

  developerFormModel = this.fb.group({
    Id: [null],
    Name: ['', Validators.required]
  });

  currentProject: Project;
  projectList: Project[];

  getProjects() {
    return this.http.get(this.BaseURI + '/ProjectBoard/GetProjects').toPromise();
  }

  deleteProject(id: number) {
    return this.http.delete(this.BaseURI + '/ProjectBoard/DeleteProject' + '?id=' + id).toPromise();
  }

  addOrEditProject() {
    if (this.projectFormModel.value.Id == null) {
      var addBody = {
        ProjectTitle: this.projectFormModel.value.ProjectTitle
      }
      return this.http.post(this.BaseURI + '/ProjectBoard/AddProject', addBody);
    }
    else {
      var editBody = {
        Id: this.projectFormModel.value.Id,
        ProjectTitle: this.projectFormModel.value.ProjectTitle
      }
      return this.http.post(this.BaseURI + '/ProjectBoard/EditProject', editBody);
    }
  }

  addOrEditDeveloper() {
    if (this.developerFormModel.value.Id == null) {
      var addBody = {
        Name: this.developerFormModel.value.Name
      }
      return this.http.post(this.BaseURI + '/ProjectBoard/AddDeveloper', addBody);
    }
    else {
      var editBody = {
        Id: this.developerFormModel.value.Id,
        Name: this.developerFormModel.value.Name
      }
      return this.http.post(this.BaseURI + '/ProjectBoard/EditDeveloper', editBody);
    }
  }

  getDevelopers() {
    return this.http.get(this.BaseURI + '/ProjectBoard/GetDevelopers').toPromise();
  }

  deleteDeveloper(id: number) {
    return this.http.delete(this.BaseURI + '/ProjectBoard/DeleteDeveloper' + '?id=' + id).toPromise();
  }

  getCurrProject(id: number) {
    return this.http.get(this.BaseURI + '/ProjectBoard/GetCurrentProjects' + '?id=' + id).toPromise();
  }

  getCurrDevelopers(id: number) {
    return this.http.get(this.BaseURI + '/ProjectBoard/GetCurrentDevelopers' + '?id=' + id).toPromise();
  }

  addDeveloperToProject(prId: number, devId: number) {
    var body = {
      projectId: prId,
      developerId: devId
    }
    return this.http.post(this.BaseURI + '/ProjectBoard/AddDeveloperToProject', body);
  }

  delDeveloperFromProject(prId: number, devId: number) {
    var body = {
      projectId: prId,
      developerId: devId
    }
    return this.http.post(this.BaseURI + '/ProjectBoard/DelDeveloperFromProject', body);
  }

}


