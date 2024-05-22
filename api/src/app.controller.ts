import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('uploads/:dirs(*)')
  getFile(@Param('dirs') dirs: string, @Res() res) {
    res.sendFile(dirs, { root: 'uploads' });
  }
}
