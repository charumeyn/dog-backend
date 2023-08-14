import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Post } from "src/posts/entities/post.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";

export enum Color {
  Black = "black",
  White = "white",
  Gray = "gray",
}

export enum Size {
  XS = "extra_small",
  S = "small",
  M = "medium",
  L = "large",
  XL = "extra_large",
}

export enum Gender {
  F = "female",
  M = "male",
}

export enum CoatLength {
  None = "none",
  Short = "short",
  Medium = "medium",
  Long = "long",
}

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'json' })
  breed!: number[];

  @Column({ nullable: true })
  birthdate?: Date;

  @Column({ type: 'json' })
  color!: Color[];

  @Column({ type: 'enum', enum: Size })
  size!: Size;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column({ name: 'coat_length', enum: CoatLength })
  coatLength!: CoatLength;

  @Column({ name: 'main_image' })
  mainImage!: string;

  @Column({ type: 'json' })
  images!: string[];

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'date' })
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Shelter, (shelter) => shelter.dogs, {
    cascade: true
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;

  @OneToMany(() => Post, post => post.dog,)
  posts: Post[];

  @OneToMany(() => Donation, donation => donation.dog,)
  donations: Donation[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.dog)
  fundraisers: Fundraiser[];
}
