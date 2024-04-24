import { IsString, IsEmail, IsStrongPassword, IsNumberString, IsAlpha, IsNotEmpty, Length } from 'class-validator';

export class CreateStudentDto {
    @Length(9, 9, { message: 'O número de matrícula deve ter 9 números.' })
    @IsNumberString({ no_symbols: true }, { message: 'O número de matrícula deve ser um número.' })
    @IsNotEmpty({ message: 'O número de matrícula é obrigatório.' })
    id: string

    @IsString({ message: 'O nome deve ser uma string.'})
    @IsAlpha()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    name: string

    @IsEmail({}, { message: 'O email é inválido. Exemplo de email válido: example@gmail.com' })
    @IsNotEmpty({ message: 'O email é obrigatório.' })
    email: string

    @IsString({ message: 'A senha deve ser uma string.'})
    @IsNotEmpty({ message: 'A senha é obrigatória.'})
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: 'A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial.' })
    password: string
}