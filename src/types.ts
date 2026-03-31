export interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Done' | 'In Progress' | 'Canceled' | 'To Do';
}

export interface Stat {
  label: string;
  value: string | number;
  trend: number;
  color: string;
}
