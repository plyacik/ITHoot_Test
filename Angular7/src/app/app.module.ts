import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DeveloperListComponent } from './home/developer-list/developer-list.component';
import { ProjectListComponent } from './home/project-list/project-list.component';
import { ProjectDetailsComponent } from './home/project-details/project-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectBoardService } from './shared/project-board.service';
import { AddProjectComponent } from './add/add-project/add-project.component';
import { AddDeveloperComponent } from './add/add-developer/add-developer.component';
import { AddDevToProjectComponent } from './add/add-dev-to-project/add-dev-to-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeveloperListComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    AddDeveloperComponent,
    AddDevToProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [AddProjectComponent,
    AddDeveloperComponent],
  providers: [ProjectBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
