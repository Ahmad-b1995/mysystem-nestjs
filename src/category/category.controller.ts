import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';

import { CategoryService } from "./category.service";
import { CreateCategory } from "./dto/create-category.dto"

@Controller('api/category')
@ApiTags('分类')
export class CategoryController {
  
  constructor(private readonly categoryService: CategoryService){}

  @Get()
  @ApiOperation({ summary: '分类列表'})
  async getAll () {
    const result = await this.categoryService.findAll({})
    return result;
  }

  @Post()
  @ApiOperation({ summary: '新建分类'})
  async create (@Body() createDto: CreateCategory) {
    const result = await this.categoryService.create(createDto)
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类'})
  async update (@Param('id') id: string, @Body() createDto: CreateCategory) {
    const result = await this.categoryService.update(id, createDto)
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类'})
  async remove (@Param('id') id: string) {
    const result = await this.categoryService.remove(id)
    return result;
  }
}
