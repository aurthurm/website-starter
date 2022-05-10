import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Name',
    example: 'emiliap',
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    example: '@se9898;09;Xv1',
  })
  readonly password: string;
}

@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('auth/login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    const user = req.user._doc;
    delete user['password'];
    return { token, user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
