import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
