import { Dog } from "src/dogs/entities/dog.entity";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  deleted_at?: Date | null;
}
