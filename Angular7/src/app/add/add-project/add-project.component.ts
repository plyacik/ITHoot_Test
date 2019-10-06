import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectBoardService } from 'src/app/shared/project-board.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styles: []
})
export class AddProjectComponent implements OnInit {

  constructor(private service: ProjectBoardService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddProjectComponent>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.addOrEditProject().subscribe(res => {
      this.service.projectFormModel.reset();
      this.dialogRef.close();
    },
      err => {
        console.log(err);
      });
  }
}
