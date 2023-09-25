import {
  IsNumber,
  IsString,
  IsEnum,
  Min,
  Max,
  Matches,
  IsStrongPassword,
  IsAlpha,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message:
      'Username must contain only letters, numbers, underscores, hyphens, and dots',
  })
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Age must be at least 0' })
  @Max(150, { message: 'Age cannot exceed 150' })
  age: number;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;
}
