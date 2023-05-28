import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Post } from "src/posts/entities/post.entity"
import { User } from "src/user-auth/user/user.entity"
import { Repository } from "typeorm"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { Comment } from "./entities/comment.entity"

@Injectable()
export class CommentsService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async create(createCommentDto: CreateCommentDto) {
    const date = new Date();
    const comment = this.commentRepository.create({
      ...createCommentDto
    })
    await this.commentRepository.save(comment)

    return {
      success: true,
      data: comment,
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
