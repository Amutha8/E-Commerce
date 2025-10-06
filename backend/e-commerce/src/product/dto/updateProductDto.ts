import { PartialType } from '@nestjs/mapped-types';
import { createProductDto } from './createProductDto';

export class updateProductDto extends PartialType(createProductDto) {}
