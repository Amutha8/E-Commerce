import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class createProductDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string; 

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  ratings?: string;
}
