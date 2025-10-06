import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class SignUpDto {
  @ApiProperty({ description: 'Enter Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Enter Email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({ description: 'Enter Department' })
  @IsNotEmpty()
  @IsString()
  dept: string;

  @ApiProperty({ description: 'Enter Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Enter Rollno' })
  @IsNotEmpty()
  @IsString()
  rollno: string;

  @ApiProperty({ description: 'Enter Age' })
  @IsNotEmpty()
  @IsString()
  age: string;
  
  @ApiProperty({ description: 'Enter PhoneNumber' })
  @IsNotEmpty()
  @IsNumber()
  phno: number;
  
  @ApiProperty({ description: 'Enter Address' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Enter Role',
  })
  @IsOptional()
  role?: Role[];
}
