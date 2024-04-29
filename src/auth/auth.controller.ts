import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { LoginDto }     from "./dto/login.dto";
import { RegisterDto }  from "./dto/register.dto";
import { AuthGuard }    from '@nestjs/passport';
import { AuthService } from "./auth.service";

@Controller('api/auth')
@ApiTags('认证')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册'})
  async register (@Body() dto: RegisterDto) {
    // const { username, password } = dto
    // const data = await this.usersService.create(dto);
    // return { data };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '用户登录'})
  async login (@Body() dto: LoginDto, @Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token'
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息'})
  async getProfile(@Request() req) {
    console.log('get profile: ', req.user);
    const user = await this.authService.findOne(req.user.username)
    return user;
  }
}

