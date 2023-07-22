import { Dog } from "src/dogs/entities/dog.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { User } from "src/user-auth/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fundraiser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  main_image: string;

  @Column('json')
  images: string[];

  @Column({ nullable: true })
  purpose: string;

  @Column()
  goal_amount: number;

  @Column({ nullable: true })
  current_amount: number;

  @Column({ nullable: true })
  starts_at?: Date | null;

  @Column({ nullable: true })
  ends_at?: Date | null;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  deleted_at?: Date | null;

  @Column({ nullable: true })
  created_by: number;

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

  @OneToMany(() => Donation, (donation) => donation.fundraiser)
  donations: Donation[];
}

