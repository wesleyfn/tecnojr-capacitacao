import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('admin/login')
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'admin');
  }

  @Post('reviewer/login')
  async reviewerLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'reviewer');
  }

  @Post('student/login')
  async studentLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'student');
  }
}
