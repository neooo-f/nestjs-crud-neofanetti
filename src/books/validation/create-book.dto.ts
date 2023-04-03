import { IsNotEmpty, IsAlpha, IsNumberString, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumberString()
  publishingYear: string;

  @IsNotEmpty()
  @IsAlpha()
  author: string;
}
