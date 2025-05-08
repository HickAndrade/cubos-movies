import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    async create(@Body() dto: CreateUserDTO): Promise<Partial<User>> {
        const user = await this.usersService.create(dto);

        const { password, ...result } = user;

        return result;
    }
    

}