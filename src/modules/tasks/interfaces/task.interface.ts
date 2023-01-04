import { Document } from 'mongoose';

export interface Task extends Document {
  _id: string;
  userId: string;
  description: string;
  active: boolean;
}
