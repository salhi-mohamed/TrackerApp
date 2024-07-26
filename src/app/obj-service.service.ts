import { Injectable } from '@angular/core';
import { Objective } from './models/objective.model';

@Injectable({
  providedIn: 'root'
})
export class ObjServiceService {
  objectives: Objective[] = [
    // Ajoutez des objectifs d'exemple avec des identifiants uniques si nécessaire
  ];

  constructor() { }

  getObjectives(): Objective[] {
    return this.objectives;
  }

  getObjectiveById(id: number): Objective | undefined {
    return this.objectives.find(objective => objective.id === id);
  }

  deleteObjective(objectiveToDelete: Objective): void {
    this.objectives = this.objectives.filter(objective => objective !== objectiveToDelete);
  }

  // Génère un identifiant unique
  generateNextId(): number {
    return this.objectives.length > 0 ? Math.max(...this.objectives.map(obj => obj.id)) + 1 : 1;
  }

  // Ajoute un nouvel objectif avec un identifiant unique
  addObjective(newObjective: Objective): void {
    newObjective.id = this.generateNextId();
    this.objectives.push(newObjective);
  }

  // Met à jour un objectif existant
  updateObjective(updatedObjective: Objective): void {
    const index = this.objectives.findIndex(objective => objective.id === updatedObjective.id);
    if (index !== -1) {
      this.objectives[index] = updatedObjective;
    }
  }
}