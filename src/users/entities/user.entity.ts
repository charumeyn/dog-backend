import { Exclude } from "class-transformer";
import { Address } from "src/addresses/entities/address.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { UserType } from "src/common/enums/user-type.enum";
import { Donation } from "src/donations/entities/donation.entity";
import { Fundraiser } from "src/fundraisers/entities/fundraiser.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public last_login_at: Date | null;

  @Column({ type: 'varchar' })
  public first_name: string | null;

  @Column({ type: 'varchar' })
  public last_name: string | null;

  @Column({ type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ nullable: true, default: UserType.Member })
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
}