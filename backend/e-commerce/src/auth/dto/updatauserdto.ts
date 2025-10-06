import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class updateUserDto {
  @ApiProperty({ description: 'Enter Name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Enter Email' })
  @IsOptional()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({ description: 'Enter Department' })
  @IsOptional()
  @IsString()
  dept: string;

  @ApiProperty({ description: 'Enter Rollno' })
  @IsOptional()
  @IsString()
  rollno: string;

  @ApiProperty({ description: 'Enter Age' })
  @IsOptional()
  @IsString()
  age: string;

  @ApiProperty({ description: 'Enter PhoneNumber' })
  @IsOptional()
  phno: number;

  @ApiProperty({ description: 'Enter Address' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Enter Role' })
  @IsOptional()
  role?: Role[];
}
