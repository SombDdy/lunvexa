export type Project = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  dueDate: string;
  taskCount: number;
  progress: number;
  workflowId: number;
};