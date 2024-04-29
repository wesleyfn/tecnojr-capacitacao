import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Rota para redirecionar para /api
  @Get()
  @Redirect('api')
  redirectToApi() {
    console.log("Redirecting to /api");
  }

  // Rota para verificar se a API está rodando
  @Get('api')
  getApiStatus() {
    console.log("API is running")
    return this.appService.getApiStatus();
  }
}
