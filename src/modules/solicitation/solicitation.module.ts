import { Module } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { SolicitationController } from './solicitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitation } from './entities/solicitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitation])],
  controllers: [SolicitationController],
  providers: [SolicitationService],
  exports: [SolicitationService],
})
export class SolicitationModule { }
