import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/user.dto";
import { User } from "./users.entity";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
     create(@Body() dto: CreateUserDTO): Promise<User> {
        return this.usersService.create(dto);

   

       
    }
    

}