import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('用户')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  async findAll() {
    const data = await this.usersService.findAll();
    return { data };
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return { data };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return { data };
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);
    return { data };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(id);
    return { data };
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.usersService.login(loginDto);
    console.log('data is: ', data);
    if (!data) {
      return { desc: '用户名或密码不正确' }
    }
    return { data };
  }
}
