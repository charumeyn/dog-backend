import { Exclude } from "class-transformer";
import { Address } from "src/addresses/entities/address.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: 'https://doggoslife.s3.ap-northeast-2.amazonaws.com/default-user.jpg' })
  image!: string;

  @Column({ nullable: true, default: UserType.User })
  public type: UserType;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  public address?: Address;

  @OneToOne(() => Shelter, shelter => shelter.user)
  shelter: Shelter;

  @OneToMany(() => Dog, dog => dog.user)
  dogs: Dog[];

  @OneToMany(() => Comment, comment => comment.user,)
  comments: Comment[];

  @OneToMany(() => Donation, donation => donation.donor,)
  donations: Donation[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.user,)
  fundraisers: Fundraiser[];

  @OneToMany(() => Fundraiser, createdFundraiser => createdFundraiser.createdByUser,)
  createdFundraisers: Fundraiser[];

  @Column({ name: 'favorite_dog_ids', nullable: true, type: "int", array: true, default: [] })
  public favoriteDogIds?: number[];

}