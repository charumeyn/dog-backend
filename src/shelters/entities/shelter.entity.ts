import { Address } from "src/addresses/entities/address.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @Column({ name: 'approver_id', nullable: true })
  approverId?: number;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive!: boolean;

  @Column({ name: 'is_approved', type: 'boolean' })
  isApproved!: boolean;

  @Column({ name: 'approved_at', type: 'date', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'main_image' })
  mainImage!: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ name: 'created_at', type: 'date' })
  createdAt!: Date;

  @OneToMany(() => Dog, dog => dog.shelter)
  dogs: Dog[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.shelter)
  fundraisers: Fundraiser[];

  @OneToMany(() => User, user => user.shelter)
  users: User[];
}
