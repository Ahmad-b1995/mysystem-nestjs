import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { Media } from './media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as MAO from 'multer-aliyun-oss';
import * as crypto from 'crypto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
            filename(req, file, cb) {
              crypto.pseudoRandomBytes(16, (err, raw) => {
                const date = new Date();
                const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                const name = `${time}-${raw.toString('hex').substring(0, 8)}-${file.originalname}`;
                cb(err, err ? undefined : name);
              });
            },
          }),
        };
      },
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
