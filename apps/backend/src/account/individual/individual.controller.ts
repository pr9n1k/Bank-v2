import { createIndividual } from '@bank-v2/interface';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IndividualService } from './individual.service';

@Controller('individual')
export class IndividualController {
  constructor(private service: IndividualService) {}

  @Post('add')
  create(@Body() dto: createIndividual) {
    return this.service.create(dto);
  }

  @Get('get')
  get() {
    return this.service.get();
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
