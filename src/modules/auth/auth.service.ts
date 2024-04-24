import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { StudentService } from '../student/student.service';
import { ReviewerService } from '../reviewer/reviewer.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly reviewerService: ReviewerService
  ) { }

  async login(loginDto: LoginDto, role: 'admin' | 'student' | 'reviewer') {
    let user: any;
    switch (role) {
      case 'admin':
        user = await this.adminService.findOneByEmail(loginDto.email);
        break;
      case 'student':
        user = await this.studentService.findOneByEmail(loginDto.email);
        break;
      case 'reviewer':
        user = await this.reviewerService.findOneByEmail(loginDto.email);
        break;
      default:
        throw new UnauthorizedException('Role inválido.');
    }

    if (user && bcrypt.compareSync(loginDto.password, user.password)) {
      const payload = { email: user.email, sub: user.id, role: role };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Email e/ou senha inválidos.');
  }
}