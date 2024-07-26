import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isEditing: boolean = false;
  taskBeingEdited: Task | null = null;
  showDialog: boolean = false;
  taskToDelete: Task | null = null;

  constructor(public taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  deleteTask(taskToDelete: Task) {
    this.showDialog = true;
    this.taskToDelete = taskToDelete;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.taskToDelete) {
      console.log(`Deleting task with ID: ${this.taskToDelete._id}`); 
      this.taskService.deleteTask(this.taskToDelete._id).subscribe(
        () => {
          console.log(`Task with ID: ${this.taskToDelete?._id} deleted successfully`); 
          this.tasks = this.tasks.filter(task => task._id !== this.taskToDelete?._id);
          this.showDialog = false;
          this.taskToDelete = null;
        },
        (error) => {
          console.error('Error deleting task', error);
          this.showDialog = false;
          this.taskToDelete = null;
        }
      );
    } else {
      this.showDialog = false;
      this.taskToDelete = null;
    }
  }

  viewTaskDetails(id: string) {
    this.router.navigate(['/task', id]);
  }

  editTask(task: Task) {
    this.isEditing = true;
    this.taskBeingEdited = { ...task };
  }

  saveTask() {
    if (this.taskBeingEdited) {
      this.taskService.updateTask(this.taskBeingEdited).subscribe(
        (updatedTask) => {
          const index = this.tasks.findIndex(task => task._id === updatedTask._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.isEditing = false;
            this.taskBeingEdited = null;
          }
        },
        (error) => {
          console.error('Error updating task', error);
        }
      );
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.taskBeingEdited = null;
    console.log("hey")
  }

  calculateProgress(task: Task): number {
    return task.status === 'Complété' ? 100 : task.status === 'En cours' ? 50 : 0;
  }
}
