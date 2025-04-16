export type Task = {
  _id?: string;
  title: string;
  description: string;
  dueDate: Date | string;
  completed?: boolean;
};
