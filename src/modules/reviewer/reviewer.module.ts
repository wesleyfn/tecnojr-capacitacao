import { Module } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';
import { ReviewerController } from './reviewer.controller';
import { Reviewer } from './entities/reviewer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reviewer])],
  controllers: [ReviewerController],
  providers: [ReviewerService],
  exports: [ReviewerService],
})
export class ReviewerModule {}
