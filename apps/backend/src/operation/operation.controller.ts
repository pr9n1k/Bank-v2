import { Body, Controller, Get, Post, Put, Param, Query } from '@nestjs/common';
import {
  createOperation,
  operationConfirm,
  queryPagination,
} from '@bank-v2/interface';
import { OperationService } from './operation.service';

@Controller('operation')
export class OperationController {
  constructor(private service: OperationService) {}
  @Post('add')
  create(@Body() dto: createOperation) {
    return this.service.create(dto);
  }
  @Get('get')
  get(@Query() query?: queryPagination) {
    return this.service.get(query);
  }
  @Get('get-not-confirm/:id')
  getByNotConfirm(@Param('id') id: string, @Query() query?: queryPagination) {
    return this.service.getByNotConfirm(parseInt(id), query);
  }
  @Put('confirm')
  confirm(@Body() dto: operationConfirm) {
    return this.service.confirm(dto);
  }
}
