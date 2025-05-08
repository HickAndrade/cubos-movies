import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
    name: string;

    @IsEmail({},{ message: 'Informe um email válido.' })
    email: string;

    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
    password: string;
}