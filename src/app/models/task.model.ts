export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  category: string;
  tags: string;
  reminderEnabled: boolean;
  reminder: Date;
  reminded: boolean; // Add this attribute
}
