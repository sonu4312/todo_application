export interface Todo {
  id: number;
  title: string;
  description: string;
  completionDate: string;
  completed: boolean;
  createdAt: string;
}

export type TodoStatus = "all" | "pending" | "completed";
