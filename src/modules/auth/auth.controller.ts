import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  // Rota para login de administradores
  @Post('admin/login')
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'admin');
  }

  // Rota para login de revisores
  @Post('reviewer/login')
  async reviewerLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'reviewer');
  }

  // Rota para login de estudantes
  @Post('student/login')
  async studentLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, 'student');
  }
}
