// src/app/models/objective.model.ts
export interface Objective {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  startDate: string;
  endDate: string;
  tags: string;
  attachment: any;
  reminderEnabled: boolean;
  reminder: string;
  privacy: string;
  progress: number;
}
