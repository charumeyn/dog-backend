import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Fundraiser } from 'src/fundraisers/entities/fundraiser.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User, Dog, Fundraiser])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
