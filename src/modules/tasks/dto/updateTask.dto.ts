import { IsNumberString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsNumberString()
  id: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  active: boolean;
}
