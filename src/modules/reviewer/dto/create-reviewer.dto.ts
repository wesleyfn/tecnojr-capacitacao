import { IsAlpha, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateReviewerDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsString({ message: 'O email deve ser uma string.' })
  @IsEmail({}, { message: 'O email é inválido. Exemplo de email válido: example@email.com' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
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
