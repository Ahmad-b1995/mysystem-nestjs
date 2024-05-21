import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, type: 'text' })
  desc: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
