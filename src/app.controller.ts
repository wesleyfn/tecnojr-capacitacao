import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController { 
    constructor(private readonly appService: AppService) { }
    
    @Get()
    @Redirect('api')
    redirectToApi() {
        console.log("Redirecting to /api");
    }
        
    @Get('api')
    getApiStatus() {
        console.log("API is running")
        return this.appService.getApiStatus();
    }
}