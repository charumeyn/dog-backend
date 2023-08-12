import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Post } from "src/posts/entities/post.entity"
import { Repository } from "typeorm"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { Comment } from "./entities/comment.entity"
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class CommentsService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async create(dto: CreateCommentDto) {
    const getPost = await this.postRepository.findOneOrFail({
      where: { id: dto.postId },
    })
    const getUser = await this.userRepository.findOneOrFail({
      where: { id: dto.userId },
    })
    const comment = this.commentRepository.create({
      content: dto.content,
      createdAt: new Date(),
      post: getPost,
      user: getUser,
    })
    await this.commentRepository.save(comment)

    return {
      success: true,
      data: comment,
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, size } = paginationQuery;
    const comments = await this.commentRepository.find({
      skip: offset,
      take: limit,
      relations: {
        post: true,
        user: true,
      },
    })

    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOneOrFail({
      where: { id },
    })
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} was not found`)
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id: +id,
      ...updateCommentDto
    })
    if (!comment) {
      throw new NotFoundException(`Comment with ${id} not found`)
    }
    await this.commentRepository.save(comment)
    return {
      success: true,
      data: comment,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
