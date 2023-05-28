import { Dog } from "src/dogs/entities/dog.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dog, (dog) => dog.posts, {
    cascade: true,
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @OneToMany(() => Post, post => post.comments)
  comments: Comment[];


  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  thumb_image: string;

  @Column('json')
  images: string[];

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  deleted_at?: Date | null;
}
