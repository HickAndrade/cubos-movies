import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/user.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUserId } from "./decorators/current-user.decorator";
import { User } from "src/users/user.entity";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<{ token: string }> {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDTO): Promise<{ token: string }> {
        return this.authService.login(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@CurrentUserId() userId: string): Promise<Omit<User, 'password'>> {
        return this.authService.me(userId)
    }
}