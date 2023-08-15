import { Dog } from "src/dogs/entities/dog.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum CommentType {
  Post = "post",
  Dog = "dog",
  Fundraiser = "fundraiser",
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => Fundraiser, (fundraiser) => fundraiser.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'fundraiser_id', referencedColumnName: 'id' })
  fundraiser: Fundraiser;

  @ManyToOne(() => Dog, (dog) => dog.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  content: string;

  @Column({ name: 'comment_type', type: 'enum', enum: CommentType })
  commentType: Date;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
