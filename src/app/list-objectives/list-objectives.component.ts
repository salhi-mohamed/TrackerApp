import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Objective } from '../models/objective.model';
import { ObjServiceService } from '../obj-service.service';

@Component({
  selector: 'app-list-objectives',
  templateUrl: './list-objectives.component.html',
  styleUrls: ['./list-objectives.component.css']
})
export class ListObjectivesComponent implements OnInit {
  objectives: Objective[] = [];
  isEditing: boolean = false;
  objectiveBeingEdited: Objective | null = null;
  showDialog: boolean = false;
  objectiveToDelete: Objective | null = null;

  constructor(public objService: ObjServiceService, private router: Router) {}

  ngOnInit() {
    this.objectives = this.objService.getObjectives();
  }

  deleteObj(objectiveToDelete: Objective) {
    this.showDialog = true;
    this.objectiveToDelete = objectiveToDelete;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.objectiveToDelete) {
      this.objService.deleteObjective(this.objectiveToDelete);
      this.objectives = this.objService.getObjectives(); // Update the local list
    }
    this.showDialog = false;
    this.objectiveToDelete = null;
  }

  viewGoalDetails(id: number) {
    this.router.navigate(['/goal', id]);
  }

  editObjective(objective: Objective) {
    this.isEditing = true;
    this.objectiveBeingEdited = { ...objective };
  }

  saveObjective() {
    if (this.objectiveBeingEdited) {
      this.objService.updateObjective(this.objectiveBeingEdited);
      this.objectives = this.objService.getObjectives();
      this.isEditing = false;
      this.objectiveBeingEdited = null;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.objectiveBeingEdited = null;
  }
}
