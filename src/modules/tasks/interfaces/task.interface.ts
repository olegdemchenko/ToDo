import { Document } from 'mongoose';

export interface Task extends Document {
  _id: string;
  description: string;
  active: boolean;
}
