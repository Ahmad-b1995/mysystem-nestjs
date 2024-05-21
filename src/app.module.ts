import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import appConfig from './common/config/app.config';
import jwtConfig from './common/config/jwt.config';
import databaseConfig from './common/config/database.config';
import swaggerConfig from './common/config/swagger.config';
import { validate } from './common/validation/env.validation';
import redisConfig from './common/config/redis.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';
import { CategoryModule } from './category/category.module';
import { RedisModule } from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { DayModule } from './day/day.module';
import { GoalsModule } from './goals/goals.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, redisConfig, databaseConfig, swaggerConfig],
      validate,
    }),
    DatabaseModule,
    GoalsModule,
    TasksModule,
    PostsModule,
    UsersModule,
    AuthModule,
    MediaModule,
    MailModule,
    RedisModule,
    TagsModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'),
    }),
    DayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
