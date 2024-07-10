import { IsString, IsInt, Length } from '@nestjs/class-validator';

export class LoginDto {

  @IsString()
  @Length(8, 32)
  password: string;

  @IsInt()
  rut: number;

}