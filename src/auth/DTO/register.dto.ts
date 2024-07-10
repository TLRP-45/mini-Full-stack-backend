import { IsString, IsInt, IsBoolean, IsEmail, Length, Min, Max } from '@nestjs/class-validator';

export class RegisterDto {
  @IsString()
  @Length(5, 50)
  fullname: string;

  @IsString()
  @Length(8, 32)
  password: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsInt()
  @Min(900000000)
  @Max(999999999)
  phone: number;

  @IsInt()
  rut: number;

  @IsBoolean()
  status: boolean;
}
