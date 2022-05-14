import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { createCommunal } from '@bank-v2/interface';
import { CommunalService } from './communal.service';

@Controller('communal')
export class CommunalController {
  constructor(private service: CommunalService) {}
  @Post('add')
  create(@Body() dto: createCommunal) {
    return this.service.create(dto);
  }
  @Get('get')
  get() {
    return this.service.get();
  }
  @Delete('all')
  delete() {
    return this.service.deleteAll();
  }
}
