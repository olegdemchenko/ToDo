import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  _id: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  active: boolean;
}
