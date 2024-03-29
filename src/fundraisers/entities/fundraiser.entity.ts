import { Comment } from "src/comments/entities/comment.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum FundraiserType {
  Dog = "DOG",
  User = "USER",
  Shelter = "SHELTER"
}

export enum FundraiserStatus {
  NotStarted = "not_started",
  InProgress = "in_progress",
  Ended = "ended",
}

@Entity()
export class Fundraiser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  content!: string;

  @Column({ name: 'main_image' })
  mainImage?: string;

  @Column({ type: 'json' })
  images: string[];

  @Column({ name: 'goal_amount' })
  goalAmount!: number;

  @Column({ name: 'starts_at', type: 'date', nullable: true })
  startsAt?: Date;

  @Column({ name: 'ends_at', type: 'date', nullable: true })
  endsAt?: Date | null;

  @Column({ name: 'created_at', type: 'date' })
  createdAt!: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Shelter, (shelter) => shelter.fundraisers, {
    cascade: true,
    nullable: true
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;

  @ManyToOne(() => Dog, (dog) => dog.fundraisers, {
    cascade: true,
    nullable: true
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @ManyToOne(() => User, (user) => user.fundraisers, {
    cascade: true,
    nullable: true
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, (createdByUser) => createdByUser.fundraisers, {
    cascade: true,
    nullable: true
  })
  @JoinColumn({ name: 'created_by_id', referencedColumnName: 'id' })
  createdByUser: User;

  @OneToMany(() => Donation, (donation) => donation.fundraiser)
  donations: Donation[];

  @OneToMany(() => Comment, (comment) => comment.fundraiser)
  comments: Comment[];
}

