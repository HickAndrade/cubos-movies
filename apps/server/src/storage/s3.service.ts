import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Controller, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "crypto";

@Injectable()
export class S3Service {
    private bucket: string

    constructor(
        @Inject(S3Client) private readonly client: S3Client,
        private readonly config: ConfigService
    ) {
        this.bucket = this.config.getOrThrow('AWS_S3_BUCKET')
    }

    async uploadFile(buffer: Buffer, originalName: string, contentType: string) :Promise<string> {
        const key = `${randomUUID()}-${originalName}`

        try {
            await this.client.send(new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: contentType
            }))

            return `https://${this.bucket}.s3.${this.config.get('AWS_REGION')}.amazonaws.com/${key}`

        } catch (error) {
            throw new InternalServerErrorException('Falha ao enviar arquivo para S3')
        }
    }

}