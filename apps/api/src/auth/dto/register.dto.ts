import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

const roles = ['rider', 'driver', 'dispatcher', 'admin'] as const;

export class RegisterDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsIn(roles)
  role!: (typeof roles)[number];
}
