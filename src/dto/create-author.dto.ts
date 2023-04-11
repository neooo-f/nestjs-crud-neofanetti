import { IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
