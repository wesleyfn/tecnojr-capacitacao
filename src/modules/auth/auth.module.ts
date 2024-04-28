import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { StudentModule } from '../student/student.module';
import { ReviewerModule } from '../reviewer/reviewer.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KeyValidationMiddleware } from 'src/common/middleware/key-validation.middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptons: { expiresIn: '2d' }
      }),
      global: true,
      inject: [ConfigService]
    }),
    AdminModule,
    ReviewerModule,
    StudentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeyValidationMiddleware)
      .forRoutes('api/admin/login');
  }
}
