import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'Senha não pode ser vazia.' })
    password: string;
}

