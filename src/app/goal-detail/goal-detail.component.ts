import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ObjServiceService } from '../obj-service.service';
import { Objective } from '../models/objective.model';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit, AfterViewInit {
  goal: Objective | undefined;
  chart: any;

  constructor(private route: ActivatedRoute, private objService: ObjServiceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const goalId = Number(this.route.snapshot.paramMap.get('id'));
    this.goal = this.objService.getObjectiveById(goalId);
  }

  ngAfterViewInit(): void {
    if (this.goal) {
      this.createChart();
    }
  }

  createChart(): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Progression',
          data: [10, 30, 50, 20, 60, 90],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
