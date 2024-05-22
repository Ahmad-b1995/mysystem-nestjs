import { Abstract } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('posts')
export class Post extends Abstract {
  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'longtext', nullable: true })
  contentHtml: string;

  @Column({ nullable: true })
  categories: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 'wencaizhang' })
  author: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: false })
  del: boolean;
}
