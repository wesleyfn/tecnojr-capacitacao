import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitationDto } from './create-solicitation.dto';
import { SolicitationStatusEnum } from 'src/common/enum/status.enum';
import { IsEnum } from 'class-validator';

export class UpdateSolicitationDto extends PartialType(CreateSolicitationDto) { }

export class UpdateSolicitationStatusDto {
    @IsEnum(SolicitationStatusEnum, { message: 'Status inválido.' })
    status: SolicitationStatusEnum;
}
