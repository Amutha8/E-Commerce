import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Enter user Email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({ description: 'Enter user Password' })
  @IsNotEmpty()
  @IsString({})
  @MinLength(6)
  password: string;
}
