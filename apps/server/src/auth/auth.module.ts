import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' }
            })
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}