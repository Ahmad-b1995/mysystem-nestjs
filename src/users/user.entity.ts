import { Abstract } from 'src/database/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends Abstract {
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
}
