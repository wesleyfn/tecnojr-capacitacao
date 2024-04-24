import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { KeyValidationMiddleware } from 'src/common/middleware/key-validation.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeyValidationMiddleware)
      .forRoutes(AdminController);
  }
}
