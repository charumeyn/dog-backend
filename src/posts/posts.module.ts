import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Dog])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
