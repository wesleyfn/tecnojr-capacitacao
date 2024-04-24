const { google } = require('googleapis');
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitation } from '../solicitation/entities/solicitation.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetsService {
    constructor(
        @InjectRepository(Solicitation)
        private solicitationRepository: Repository<Solicitation>,
        private readonly configService: ConfigService
    ) { }

    async sendData(): Promise<any> {
        const allSolicitations = await this.solicitationRepository.find({ relations: ['student'] });

        const { googleSheets, spreadsheetId } = await this.getAuthSheets();

        // Converte as solicitações em um array de arrays para inserir na planilha
        const data = allSolicitations.map(solicitation => [
            solicitation.studentId,
            solicitation.student.craa,
            solicitation.student.status,
            solicitation.updated_at.toLocaleString(),
            solicitation.description
        ]);

        // Insere os dados na planilha
        const response = await googleSheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Solicitacoes!A2:F',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: data,
            },
        });

        return response.data;
    }

    private async getAuthSheets(): Promise<any> {
        const credentials: JSON = JSON.parse(
            Buffer.from(this.configService.get<string>('GOOGLE_CREDENTIALS'), 'base64').toString('utf-8')
        );

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });

        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = this.configService.get('GOOGLE_SPREADSHEET_ID');

        return { auth, client, googleSheets, spreadsheetId };
    }
}