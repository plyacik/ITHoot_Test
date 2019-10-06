import { Component, OnInit } from '@angular/core';
import { ProjectBoardService } from 'src/app/shared/project-board.service';
import { Project, Developer } from 'src/app/shared/models';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styles: []
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private service: ProjectBoardService) { }

  selectPrj: string;
  currPrj: Project;

  DeveloperList: Developer[];

  ngOnInit() {
    this.onChanged(0);
  }

  onChanged(id: any) {
    if (typeof id === 'undefined') {
      this.service.getCurrProject(0).then(
        res => {
          this.currPrj = res as Project;
          this.selectPrj = this.currPrj.projectTitle;
        }
      )
    }
    this.service.getCurrProject(id).then(
      res => {
        this.currPrj = res as Project;
        this.selectPrj = this.currPrj.projectTitle;
      }
    )
    this.service.getCurrDevelopers(id).then(
      res => {
        this.DeveloperList = res as Developer[];
      },
      err => {
        console.log(err);
      }
    )
  }

  onDevToProject(id: number) {
    this.service.addDeveloperToProject(this.currPrj.id, id).subscribe(res => {
      this.onChanged(this.currPrj.id);
    },
      err => { console.log(err) });
  }

  onDeveloperDelete(id: number) {
    this.service.delDeveloperFromProject(this.currPrj.id, id).subscribe(res => {
      this.onChanged(this.currPrj.id);
    },
      err => { console.log(err) });
  }
}
