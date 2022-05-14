import { createLegal } from '@bank-v2/interface';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LegalService } from './legal.service';

@Controller('legal')
export class LegalController {
  constructor(private service: LegalService) {}

  @Post('add')
  create(@Body() dto: createLegal) {
    return this.service.create(dto);
  }

  @Get('get')
  get() {
    return this.service.get();
  }

  @Get('get-communal')
  getCommunal() {
    return this.service.getCommunal();
  }

  @Get('get/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(parseInt(id));
  }

  @Get('get-client/:id')
  getByIdClient(@Param('id') id: string) {
    return this.service.getByIdClient(parseInt(id));
  }

  @Get('get-number/:number')
  getByNumber(@Param('number') number: string) {
    return this.service.getByNumber(number);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
