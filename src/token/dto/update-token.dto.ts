import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token.dto';
import { IsNumber } from 'class-validator';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {

}
