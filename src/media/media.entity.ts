import { Abstract } from 'src/database/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media extends Abstract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column({ type: 'longtext' })
  url: string; // This should store the relative URL to access the file.

  @Column()
  date: Date;

  @Column({ default: false })
  del: boolean; // Keeps track of soft deletion status.
}
