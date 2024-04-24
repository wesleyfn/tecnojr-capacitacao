import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateSolicitationDto {
    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    @IsString({ message: 'A descrição deve ser uma string.' })
    description: string;
}
