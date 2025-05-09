import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
     create(@Body() dto: CreateUserDTO): Promise<User> {
        return this.usersService.create(dto);

   

       
    }
    

}