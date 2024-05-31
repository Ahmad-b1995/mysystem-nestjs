import { Abstract } from 'src/database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends Abstract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: false })
  del: boolean;
}
