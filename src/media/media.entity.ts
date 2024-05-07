import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column({ type: 'longtext' })
  url: string;

  @Column({ default: 'aliyun' })
  oss: string;

  @Column()
  date: string;

  @Column({ default: false })
  del: boolean;
}
