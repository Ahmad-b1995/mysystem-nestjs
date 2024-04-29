import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PostEntity } from './posts.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const _ = require('lodash');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly PostsRepo: Repository<PostEntity>,
  ) {}

  async findAll(option): Promise<any> {
    const {
      pageSize = 10,
      pageNo = 1,
      sortField = 'createAt',
      sortOrder = 'descend',
    } = option;
    const orderMap = {
      ascend: 'ASC',
      descend: 'DESC',
    };
    const order = { [sortField]: orderMap[sortOrder] };
    // console.log('order is', order)
    return this.PostsRepo.findAndCount({
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      order: order,
      select: [
        'id',
        'title',
        'createAt',
        'updateAt',
        'isPublic',
        'del',
        'categories',
        'tags',
        'summary',
        'slug',
        'img',
      ],
    });
  }

  findOne(id: string): Promise<PostEntity> {
    return this.PostsRepo.findOne({ where: { id: +id } });
  }

  findPostsByTag(tag: string): Promise<any> {
    return this.PostsRepo.find({
      where: { tags: Like(`%${tag}%`) },
    });
  }

  findPostsByCategory(category: string): Promise<any> {
    return this.PostsRepo.find({
      where: { categories: Like(`%${category}%`) },
    });
  }

  public(id: number): Promise<any> {
    return this.PostsRepo.update(id, { isPublic: true });
  }

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.createAt = Date.now();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.author = createPostDto.author;
    post.categories = JSON.stringify(createPostDto.categories);
    post.tags = JSON.stringify(createPostDto.tags);
    post.summary = createPostDto.summary;
    post.slug = createPostDto.slug;
    post.img = createPostDto.img;
    console.log('post is: ', post);

    return this.PostsRepo.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const updateAt = Date.now();
    const post = await this.PostsRepo.findOne(id);
    const { title, content, isPublic, categories, tags, summary, slug, img } =
      updatePostDto;

    const data = { updateAt };
    if (!_.isUndefined(title)) {
      Object.assign(data, { title });
    }
    if (!_.isUndefined(content)) {
      Object.assign(data, { content });
    }
    if (!_.isUndefined(isPublic)) {
      Object.assign(data, { isPublic });
    }
    if (!_.isUndefined(categories)) {
      Object.assign(data, { categories: JSON.stringify(categories) });
    }
    if (!_.isUndefined(tags)) {
      Object.assign(data, { tags: JSON.stringify(tags) });
    }
    if (!_.isUndefined(summary)) {
      Object.assign(data, { summary });
    }
    if (!_.isUndefined(slug)) {
      Object.assign(data, { slug });
    }
    if (!_.isUndefined(img)) {
      Object.assign(data, { img });
    }

    this.PostsRepo.merge(post, data);
    return this.PostsRepo.save(post);
  }

  async remove(id: string): Promise<void> {
    await this.PostsRepo.delete(id);
  }
}
