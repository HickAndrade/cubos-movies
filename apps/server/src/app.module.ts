import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { MoviesModule } from './movies/movies.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [join(__dirname, '**/*.entity.{ts,js}')],
        migrations: [join(__dirname, 'migrations/*.{ts,js}')]
      })
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    StorageModule
  ]
})
export class AppModule {}


