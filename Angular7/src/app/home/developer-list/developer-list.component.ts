import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Developer } from 'src/app/shared/models';
import { ProjectBoardService } from 'src/app/shared/project-board.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDeveloperComponent } from 'src/app/add/add-developer/add-developer.component';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styles: []
})
export class DeveloperListComponent implements OnInit {

  DeveloperList: Developer[];
  currentDev: Developer;

  @Output() onDevToProject = new EventEmitter<number>();

  constructor(private service: ProjectBoardService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateDeveloperList();
  }

  updateDeveloperList() {
    this.service.getDevelopers().then(
      res => {
        this.DeveloperList = res as Developer[];      
      },
      err => {
        console.log(err);
      }
    )
  }

  AddDeveloper() {
    this.service.developerFormModel.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddDeveloperComponent, dialogConfig).afterClosed().subscribe(result => {
      this.updateDeveloperList();
    });
  }

  onEditDeveloper(id: number) {
    this.currentDev = this.DeveloperList.find(prj => prj.id == id);
    this.service.developerFormModel.setValue({
      Id: this.currentDev.id,
      Name: this.currentDev.name
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddDeveloperComponent, dialogConfig).afterClosed().subscribe(result => {
      this.updateDeveloperList();
    });
  }

  onDeveloperDelete(id: number) {
    this.service.deleteDeveloper(id).then(
      res => {
        this.updateDeveloperList();
      }
    )
  }

  onToProject(id: number) {
    this.onDevToProject.emit(id);
  }

}
