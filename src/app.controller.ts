import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return { success: true, data: { name: 'hello world' } };
  }
}
