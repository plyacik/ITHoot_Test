import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectBoardService } from 'src/app/shared/project-board.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styles: []
})
export class AddDeveloperComponent implements OnInit {

  constructor(private service: ProjectBoardService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddDeveloperComponent>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.addOrEditDeveloper().subscribe(res => {
      this.service.developerFormModel.reset();
      this.dialogRef.close();
    },
      err => {
        console.log(err);
      });
  }

}
