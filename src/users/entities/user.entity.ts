import { Exclude } from "class-transformer";
import { Address } from "src/addresses/entities/address.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
  User = "user",
  Admin = "admin",
  Shelter = "shelter",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email!: string;

  @Exclude()
  @Column()
  public password!: string;

  @Column({ name: 'last_login_date', type: 'timestamp', nullable: true, default: null })
  public lastLoginDate: Date | null;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ nullable: true })
  public phone?: string;

  @Column({ nullable: true, default: UserType.User })
  public type: UserType;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  public address?: Address;

  @ManyToOne(() => Shelter, (shelter) => shelter.users, {
    cascade: true
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;

  @OneToMany(() => Comment, comment => comment.user,)
  comments: Comment[];

  @OneToMany(() => Donation, donation => donation.user,)
  donations: Donation[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.user,)
  fundraisers: Fundraiser[];

  @OneToMany(() => Fundraiser, createdFundraiser => createdFundraiser.createdByUser,)
  createdFundraisers: Fundraiser[];
}