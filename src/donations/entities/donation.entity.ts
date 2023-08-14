import { Dog } from "src/dogs/entities/dog.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentGateway {
  Paypal = "paypal",
  Stripe = "stripe"
}

export enum RecipientType {
  Dog = "dog",
  Shelter = "shelter",
  User = "user"
}

export enum DonationType {
  Dog = "dog",
  Fundraiser = "fundraiser",
}

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column({ name: 'transaction_id' })
  transactionId!: string;

  @Column({ name: 'transaction_firstname' })
  transactionFirstName!: string;

  @Column({ name: 'transaction_lastname' })
  transactionLastName!: string;

  @Column({ name: 'payment_gateway', type: 'enum', enum: PaymentGateway })
  paymentGateway!: PaymentGateway;

  @Column({ name: 'recipient_type', type: 'enum', enum: RecipientType })
  recipientType!: RecipientType;

  @Column({ name: 'donation_type', type: 'enum', enum: DonationType })
  donationType!: DonationType;

  @Column()
  status!: string;

  @Column()
  amount!: number;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @ManyToOne(() => Dog, (dog) => dog.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'dog_id', referencedColumnName: 'id' })
  dog: Dog;

  @ManyToOne(() => Shelter, (shelter) => shelter.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;

  @ManyToOne(() => User, (user) => user.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Fundraiser, (fundraiser) => fundraiser.donations, {
    cascade: true
  })
  @JoinColumn({ name: 'fundraiser_id', referencedColumnName: 'id' })
  fundraiser: Fundraiser;

  @ManyToOne(() => User, (user) => user.donations, {
    cascade: true,
  })
  @JoinColumn({ name: 'donor_id', referencedColumnName: 'id' })
  donor: User;
}
