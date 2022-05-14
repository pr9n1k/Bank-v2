import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { createOperation, operationConfirm } from '@bank-v2/interface';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(private service: OperationService) {}
  @Post('add')
  create(@Body() dto: createOperation) {
    return this.service.create(dto);
  }
  @Get('get')
  get() {
    return this.service.get();
  }
  @Get('get-not-confirm/:id')
  getByNotConfirm(@Param('id') id: string) {
    return this.service.getByNotConfirm(parseInt(id));
  }
  @Put('confirm')
  confirm(@Body() dto: operationConfirm) {
    return this.service.confirm(dto);
  }
}
