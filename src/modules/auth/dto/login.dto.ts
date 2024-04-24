import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O email deve ser uma string.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email é inválido. Exemplo de email válido: example@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: 'A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial.' })
  password: string;
}