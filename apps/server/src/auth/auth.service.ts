import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/user.dto";
import { UserService } from "src/users/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDTO } from "./dto/login.dto";
import { User } from "src/users/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: CreateUserDTO): Promise<{ token: string }> {

        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create({
            name: dto.name,
            email: dto.email,
            password: hash
        })

        const payload = { sub: user.id, email: user.email };
        return { token: this.jwtService.sign(payload) }
    }

    async login(dto: LoginDTO): Promise<{ token: string }> {
        const user = await this.userService.findByEmail(dto.email, true);
        if (!user) throw new UnauthorizedException('Credenciais inválidas.');
           
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if(!isMatch) throw new UnauthorizedException('Credenciais Inválidas');

        const payload = { sub: user.id, email: user.email };
        return { token: this.jwtService.sign(payload) }
    }

    async me(userId: string): Promise<Omit<User, 'password'>>{
        const user = await this.userService.findById(userId)

        if(!user) throw new NotFoundException('Usuário não encontrado');

        return user
    }

}