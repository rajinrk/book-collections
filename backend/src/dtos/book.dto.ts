import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';
export class BookDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  author?: string;

  @IsNotEmpty()
  @IsString()
  genre?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  year?: number;
}
