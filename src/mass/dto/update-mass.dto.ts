import { PartialType } from '@nestjs/mapped-types';
import { CreateMassDto } from './create-mass.dto';

import { IsString } from 'class-validator';

export class UpdateMassDto extends PartialType(CreateMassDto) {
    @IsString()
    UUID: string
}
