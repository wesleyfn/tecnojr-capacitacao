import { Controller, Put, UseGuards } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { AuthGuard } from '../../common/guard/auth.guard'
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Roles(['admin', 'reviewer'])
@Controller('api')
export class GoogleSheetsController {
  constructor(
    private readonly googleSheetsService: GoogleSheetsService
  ) { }

  // Rota para enviar os dados para a planilha
  @Put('/send-data/googlesheets')
  async sendData() {
    return await this.googleSheetsService.sendData();
  }
}
