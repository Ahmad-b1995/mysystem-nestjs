import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiProperty } from '@nestjs/swagger';

import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsQuery } from "./dto/posts-query.dto";
import { PostEntity } from "./posts.entity";
import { PostService } from "./posts.service";

@Controller('api/posts')
@ApiTags('博客')
export class PostsController {
  constructor(private readonly postService: PostService){}

  @Get()
  @ApiOperation({ summary: '博客列表' })
  async findAll (@Query() query: PostsQuery) {
    const { pageSize=10, pageNo=1 } = query;
    const page = {
      pageSize: Number(pageSize),
      pageNo: Number(pageNo)
    }
    const result = await this.postService.findAll(query);
    result[0].forEach(item => {
      item.tags = JSON.parse(item.tags)
      item.categories = JSON.parse(item.categories)
    })
    return { data: result[0], count: result[1], ...page }
  }

  @Get(':id')
  @ApiOperation({ summary: '获取博客详细信息'})
  async findOne(@Param('id') id: string) {
    const data = await this.postService.findOne(id)
    data.tags = JSON.parse(data.tags)
    data.categories = JSON.parse(data.categories)
    return { data }
  }

  @Post()
  @ApiOperation({ summary: '创建博客'})
  async create(@Body() createPostDto: CreatePostDto) {
    const data = await this.postService.create(createPostDto)
    return { data }
  }

  @Put(':id')
  @ApiOperation({ summary: '更新博客'})
  async update(@Param('id') id: string, @Body() updatePostData: UpdatePostDto) {
    const data = await this.postService.update(id, updatePostData)
    return { data }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除博客'})
  async remove(@Param('id') id: string) {
    const data = await this.postService.remove(id)
    return { data }
  }

  @Get('tags/:tag')
  @ApiOperation({ summary: '根据标签查询文章'})
  async getPostsByTag (@Param('tag') tag: string) {
    const result = await this.postService.findPostsByTag(tag)
    result.forEach(item => {
      item.tags = JSON.parse(item.tags)
      item.categories = JSON.parse(item.categories)
    })
    return result;
  }
  @Get('categories/:category')
  @ApiOperation({ summary: '根据分类目录查询文章'})
  async getPostsByCategory (@Param('category') category: string) {
    const result = await this.postService.findPostsByCategory(category)
    result.forEach(item => {
      item.tags = JSON.parse(item.tags)
      item.categories = JSON.parse(item.categories)
    })
    return result;
  }
}
