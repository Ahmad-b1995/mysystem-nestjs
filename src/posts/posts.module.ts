import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}
