import { Shelter } from "src/shelters/entities/shelter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fundraiser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profile_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('json')
  images: string[];

  @Column()
  goal_amount: number;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  deleted_at?: Date | null;

  @ManyToOne(() => Shelter, (shelter) => shelter.fundraisers, {
    cascade: true
  })
  @JoinColumn({ name: 'shelter_id', referencedColumnName: 'id' })
  shelter: Shelter;
}

