import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:3001/tasks/';

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    console.log("Entered addTask method");
    console.log("Task to be sent:", task); 
    const url = `${this.apiUrl}add`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Task>(url, task, { headers });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}get`);
  }

  deleteTask(taskId: string): Observable<void> {
    console.log(`Deleting task with ID: ${taskId}`); 
    const url = `${this.apiUrl}delete/${taskId}`;
    console.log(`URL for DELETE request: ${url}`); 
    return this.http.delete<void>(url).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Delete request error', error);
            return throwError(error);
        })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}modify/${task._id}`, task);
  }
}
