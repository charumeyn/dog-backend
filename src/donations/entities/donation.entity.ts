import { RecipientType } from "src/common/enums/recipient-type.enum";
import { Dog } from "src/dogs/entities/dog.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { User } from "src/user-auth/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  payment_gateway: string;

  @Column()
  type: RecipientType;

  @Column()
  status: string;

  @Column()
  amount: number

  @ManyToOne(() => Dog, (dog) => dog.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @ManyToOne(() => Fundraiser, (fundraiser) => fundraiser.donations, {
    cascade: true
  })
  @JoinColumn({ name: 'fundraiser_id', referencedColumnName: 'id' })
  fundraiser: Fundraiser;

  @ManyToOne(() => User, (user) => user.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, (user) => user.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'donor_id', referencedColumnName: 'id' })
  donor: User;

  @Column()
  transaction_firstname: string;

  @Column()
  transaction_lastname: string;

  @Column()
  created_at: Date;
}
