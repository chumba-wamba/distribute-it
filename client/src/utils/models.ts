export interface TaskModel {
  _id?: string;
  file: string;
  name: string;
  incentive_amount: number;
  description?: string;
  owner: string;
  executor?: string;
  status: TaskStatus;
}

export enum TaskStatus {
  COMPLETE = "Complete",
  INCOMPLETE = "Incomplete",
  INPROGRESS = "Inprogress",
}
