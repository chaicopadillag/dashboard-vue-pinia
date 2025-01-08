export type ProjectType = {
  id: string;
  name: string;
  description?: string;
  tasks: TaskType[];
};

export type TaskType = {
  id: string;
  name: string;
  description?: string;
  completedAt?: Date;
};
