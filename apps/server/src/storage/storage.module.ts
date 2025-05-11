import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({
    providers: [
        {
          provide: S3Client,
          useFactory: (cfg: ConfigService) => {
            return new S3Client({
              region: cfg.getOrThrow('AWS_REGION'),
              credentials: {
                accessKeyId: cfg.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: cfg.getOrThrow('AWS_SECRET_ACCESS_KEY'),
              },
            })
          },
          inject: [ConfigService],
        },
        S3Service,
      ],
      exports: [S3Service],
})
export class StorageModule {}
