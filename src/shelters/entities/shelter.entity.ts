import { Address } from "src/addresses/entities/address.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  content: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @Column({ name: 'approver_id', nullable: true })
  approverId?: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'is_approved', type: 'boolean', default: true })
  isApproved!: boolean;

  @Column({ name: 'approved_at', type: 'date', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'main_image' })
  mainImage!: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ name: 'created_at', type: 'date', default: new Date() })
  createdAt!: Date;

  @OneToMany(() => Dog, dog => dog.shelter)
  dogs: Dog[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.shelter)
  fundraisers: Fundraiser[];

  // @OneToMany(() => User, user => user.shelter)
  // users: User[];

  @OneToMany(() => Donation, donation => donation.shelter)
  donations: Donation[];

  @OneToOne(() => User, (user) => user.shelter, {
    cascade: true
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
