import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './user-type.enum';
import { Address } from 'src/addresses/entities/address.entity';

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
}