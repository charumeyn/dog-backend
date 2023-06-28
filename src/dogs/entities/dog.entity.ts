import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoatLength } from "../enums/coat-length.enum";
import { Color } from "../enums/color.enum";
import { Gender } from "../enums/gender.enum";
import { Size } from "../enums/size.enum";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Post } from "src/posts/entities/post.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  breed: number[];

  @Column({ nullable: true })
  birthdate?: Date | null;

  @Column('json')
  color: Color[];

  @Column()
  size: Size;

  @Column()
  gender: Gender;

  @Column()
  coat_length: CoatLength;

  @Column('json')
  images: string[];

  @Column({ nullable: true })
  description?: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  deleted_at?: Date | null;

  @ManyToOne(() => Shelter, (shelter) => shelter.dogs, {
    cascade: true
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;

  @OneToMany(() => Post, post => post.dog,)
  posts: Post[];

  @OneToMany(() => Donation, donation => donation.dog,)
  donations: Donation[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.dog,)
  fundraisers: Fundraiser[];
}
