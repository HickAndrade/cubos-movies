import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/user.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "src/users/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<Omit<User, 'password'>> {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDTO): Promise<{ token: string }> {
        return this.authService.login(dto);
    }
}