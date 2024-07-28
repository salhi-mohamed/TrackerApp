import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task-service.service';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { reminderDateValidator } from '../validators/date-validator.validator'; // Import the custom validator

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [uuidv4(), Validators.required], // Auto-generate id
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.required],
      reminderEnabled: [false],
      reminder: [''],
      reminded: [false] // Initialize reminded to false
    }, { validators: reminderDateValidator('dueDate', 'reminder') });
  }

  addTask() {
    console.log("Form Values:", this.taskForm.value);
    console.log("Form Valid:", this.taskForm.valid);

    if (this.taskForm.valid) {
      this.isSubmitting = true;
      console.log("Entered addTask method in component");
      this.taskService.addTask(this.taskForm.value as Task).subscribe(
        (response) => {
          console.log("Task added successfully:", response);
          this.successMessage = 'Task added successfully!';
          this.errorMessage = '';
          this.taskForm.reset();
          this.isSubmitting = false;
        },
        (error) => {
          console.error("Error adding task:", error);
          this.errorMessage = 'Error adding task.';
          this.successMessage = '';
          this.isSubmitting = false;
        }
      );
    } else {
      this.logValidationErrors();
      this.taskForm.markAllAsTouched(); // Mark all fields as touched to display errors
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
    }
  }

  private logValidationErrors() {
    Object.keys(this.taskForm.controls).forEach(key => {
      const controlErrors = this.taskForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          console.error(`Field: ${key}, Error: ${errorKey}, Value: ${controlErrors[errorKey]}`);
        });
      }
    });
  }
}
