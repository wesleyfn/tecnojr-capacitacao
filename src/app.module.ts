import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleSheetsModule } from './modules/google-sheets/google-sheets.module';
import { SolicitationModule } from './modules/solicitation/solicitation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/database.config';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewerModule } from './modules/reviewer/reviewer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot(config),
		AdminModule,
		StudentModule,
		SolicitationModule,
		GoogleSheetsModule,
		AuthModule,
		ReviewerModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
