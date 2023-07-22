import { Address } from "src/addresses/entities/address.entity";
import { Dog } from "src/dogs/entities/dog.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @Column()
  approver_id: number;

  @Column()
  is_active: boolean;

  @Column()
  is_approved: boolean;

  @Column()
  approved_at: Date;

  @Column()
  image_thumb: string;

  @Column('json', { nullable: true })
  images: string[];

  @Column()
  created_at: Date;

  @OneToMany(() => Dog, dog => dog.shelter)
  dogs: Dog[];

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.shelter)
  fundraisers: Fundraiser[];

  @OneToMany(() => User, user => user.shelter)
  users: User[];
}
