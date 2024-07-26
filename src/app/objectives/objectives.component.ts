import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ObjServiceService } from '../obj-service.service';
import { Objective } from '../models/objective.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent {
  newObjective: Objective = {
    id: 0, // L'ID sera généré automatiquement
    title: '',
    description: '',
    category: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
    tags: '',
    attachment: null,
    reminderEnabled: false,
    reminder: '',
    privacy: '',
    progress: 0
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(public objS: ObjServiceService) {}

  addObjective(form: NgForm) {// ajout d un objectif
    if (form.valid) {
      this.isSubmitting = true;
      try {
        this.objS.addObjective(this.newObjective);
        this.successMessage = 'Objectif ajouté avec succès!';
        this.errorMessage = '';
        this.resetForm();
        form.resetForm();
      } catch (error) {
        this.errorMessage = 'Erreur lors de l\'ajout de l\'objectif.';
        this.successMessage = '';
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  resetForm() {
    this.newObjective = {
      id: 0,
      title: '',
      description: '',
      category: '',
      priority: '',
      status: '',
      startDate: '',
      endDate: '',
      tags: '',
      attachment: null,
      reminderEnabled: false,
      reminder: '',
      privacy: '',
      progress: 0
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newObjective.attachment = file;
    }
  }
}