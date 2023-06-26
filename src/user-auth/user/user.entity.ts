import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './user-type.enum';
import { Address } from 'src/addresses/entities/address.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public last_login_at: Date | null;

  @Column({ type: 'varchar', nullable: true })
  public first_name: string | null;

  @Column({ type: 'varchar', nullable: true })
  public last_name: string | null;

  @Column({ type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ nullable: true, default: UserType.MEMBER })
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
}