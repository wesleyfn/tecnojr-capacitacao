import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { GoogleSheetsController } from './google-sheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitation } from '../solicitation/entities/solicitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitation])],
  controllers: [GoogleSheetsController],
  providers: [GoogleSheetsService],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule { }
