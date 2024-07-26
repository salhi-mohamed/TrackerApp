import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-dashboard',
  templateUrl: './simple-dashboard.component.html',
  styleUrls: ['./simple-dashboard.component.css']
})
export class SimpleDashboardComponent {
  productiveTime: number = 0;
  newTask: string = '';
  tasks: string[] = [];
  timerId: any;

  startTimer() {
    this.resetTimer(); // Réinitialise le timer avant de démarrer un nouveau
    this.timerId = setInterval(() => {
      this.productiveTime++;
    }, 60000); // Incrémente toutes les minutes (60000 ms)
  }

  resetTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.productiveTime = 0;
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  removeTask(task: string) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
}
