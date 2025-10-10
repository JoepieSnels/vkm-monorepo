import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendService {
  getHello(): string {
    return 'Backend is running!';
  }
  getHealth(): string {
    return 'OK';
  }
}
