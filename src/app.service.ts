import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getApiStatus(): { status: string } {
    return { status: 'API is running'};
  }
}

