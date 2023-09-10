import { Comment } from "src/comments/entities/comment.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Dog, (dog) => dog.posts, {
    cascade: true,
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Column()
  content!: string;

  @Column({ name: 'main_image' })
  mainImage!: string;

  @Column({ type: 'json' })
  images!: string[];

  @Column({ name: 'created_at', type: 'date', default: new Date() })
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt?: Date | null;

  @Column({ nullable: true })
  deletedAt?: Date | null;
}
