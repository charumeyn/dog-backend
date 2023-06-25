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
  donor_email: string;

  @Column()
  type: RecipientType;

  @Column()
  payment_gateway: string;

  @Column()
  status: string;

  @Column()
  amount: number

  @Column()
  created_at: Date;

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
}
