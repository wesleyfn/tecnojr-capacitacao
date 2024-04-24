import { Controller, Put, UseGuards } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { AuthGuard, RolesGuard } from '../../common/guard/auth.guard'
import { Roles } from '../../common/decorator/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Roles(['admin', 'reviewer'])
@Controller('api')
export class GoogleSheetsController {
  constructor(
    private readonly googleSheetsService: GoogleSheetsService
  ) { }

  @Put('/send-data/googlesheets')
  async sendData() {
    return await this.googleSheetsService.sendData();
  }
}
