import { PartialType } from '@nestjs/mapped-types';
import { CreateStadeDto } from './create-stade.dto';

export class UpdateStadeDto extends PartialType(CreateStadeDto) {}
