import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from "./media.entity";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly MediaRepo: Repository<Media>,
  ){}

  async findAll(option: any): Promise<any> {
    return this.MediaRepo.find({
      order: { id: -1, date: -1 },
      where: { del: false }
    })
  }

  findOne(id: string): Promise<Media> {
    return this.MediaRepo.findOne(id);
  }

  create(createMediaDto: Media): Promise<Media> {
    const media = new Media();
    const { originalname, filename, mimetype, url, oss, date } = createMediaDto
    Object.assign(media, { originalname, filename, mimetype, url, oss, date })
    return this.MediaRepo.save(media);
  }

  remove(id: string): Promise<any> {
    return this.MediaRepo.update(id, { del: true });
  }

  removeList(ids: string[]): Promise<any> {
    return this.MediaRepo.update(ids, { del: true });
  }
}
