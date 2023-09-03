import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class PostsService {
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>

  async create(dto: CreatePostDto) {
    const post = this.postRepository.create({
      ...dto,
      createdAt: new Date()
    })

    post.dog = await this.dogRepository.findOneOrFail({
      where: { id: dto.dogId }
    })

    await this.postRepository.save(post)

    return {
      success: true,
      data: post,
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const posts = await this.postRepository.find({
      skip: offset,
      take: limit,
      relations: {
        dog: true,
        comments: true
      }
    })

    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneOrFail({
      where: { id },
      relations: {
        dog: true,
        comments: true
      }
    })
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} was not found.`)
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({
      id: +id,
      ...updatePostDto
    })
    if (!post) {
      throw new NotFoundException(`Post with ${id} was not found.`)
    }
    await this.postRepository.save(post)
    return {
      success: true,
      data: post,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
