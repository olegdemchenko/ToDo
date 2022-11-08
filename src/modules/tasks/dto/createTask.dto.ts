import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  active: boolean;
}
