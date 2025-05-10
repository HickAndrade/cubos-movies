import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async create(data: Partial<User>):Promise<User> {
        const exists = await this.userRepo.findOne({ where: { email: data.email } });

        if (exists) throw new ConflictException('Email já cadastrado.')

        const user = this.userRepo.create(data);

        return this.userRepo.save(user);
    }

    async findByEmail(email: string, withPassword = false): Promise<User | null> {
        
        if(withPassword) {
            return this.userRepo.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email }).getOne();
        }

        return this.userRepo.findOne({ where: { email } })
    }

    async findById(userId: string, withPassword = false): Promise<User | null> {
        if(withPassword) {
            return this.userRepo.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.id = :userId', { id: userId }).getOne();
        }

        return this.userRepo.findOne({ where: { id: userId } })
    }
}