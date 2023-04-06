import { IsUUID, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  publishingYear: number;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
