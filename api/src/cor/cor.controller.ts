import { Controller, Get } from '@nestjs/common';
import { CorService } from './cor.service';

@Controller('cor')
export class CorController {
  constructor(private readonly corService: CorService) {}

  @Get()
  findAll() {
    return this.corService.findAll();
  }
}
