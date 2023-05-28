import { User } from "src/user-auth/user/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column({ nullable: true })
  line3: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @OneToOne(() => User, user => user.address)
  user: User;
}
