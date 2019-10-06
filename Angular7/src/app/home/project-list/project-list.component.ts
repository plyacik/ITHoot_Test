import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/shared/models';
import { ProjectBoardService } from 'src/app/shared/project-board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProjectComponent } from 'src/app/add/add-project/add-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  ProjectList: Project[];
  currentPrj: Project;

  @Output() onChanged = new EventEmitter<number>();
  
  constructor(private service: ProjectBoardService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateProjectList();
  }

  updateProjectList() {
    this.service.getProjects().then(
      res => {
        this.ProjectList = res as Project[];      
      },
      err => {
        console.log(err);
      }
    )
  }

  AddProject() {
    this.service.projectFormModel.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddProjectComponent, dialogConfig).afterClosed().subscribe(result => {
      this.updateProjectList();
    });
  }

  onProjectSelect(id: number) {
    this.onChanged.emit(id);
  }

  onEditProject(id: number) {
    this.currentPrj = this.ProjectList.find(prj => prj.id == id);
    this.service.projectFormModel.setValue({
      Id: this.currentPrj.id,
      ProjectTitle: this.currentPrj.projectTitle
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddProjectComponent, dialogConfig).afterClosed().subscribe(result => {
      this.updateProjectList();
    });
  }

  onProjectDelete(id: number) {
    this.service.deleteProject(id).then(
      res => {
        this.updateProjectList();
      }
    )
  }

}
