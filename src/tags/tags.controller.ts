import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';

import { TagsService } from "./tags.service";
import { CreateTag } from "./dto/create-tag.dto"

@Controller('api/tags')
@ApiTags('标签')
export class TagsController {
  
  constructor(private readonly tagsService: TagsService){}

  @Get()
  @ApiOperation({ summary: '标签列表'})
  async getAll () {
    const result = await this.tagsService.findAll({})
    return result;
  }

  @Post()
  @ApiOperation({ summary: '新建标签'})
  async create (@Body() createDto: CreateTag) {
    const result = await this.tagsService.create(createDto)
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: '更新标签'})
  async update (@Param('id') id: string, @Body() createDto: CreateTag) {
    const result = await this.tagsService.update(id, createDto)
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签'})
  async remove (@Param('id') id: string) {
    const result = await this.tagsService.remove(id)
    return result;
  }
}
