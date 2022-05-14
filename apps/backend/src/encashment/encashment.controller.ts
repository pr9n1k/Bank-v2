import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createEncashment, updateEncashment } from '@bank-v2/interface';
import { EncashmentService } from './encashment.service';

@Controller('encashment')
export class EncashmentController {
  constructor(private service: EncashmentService) {}
  @Post('add')
  create(@Body() dto: createEncashment) {
    return this.service.create(dto);
  }
  @Put('isCashier')
  isCashier(@Body() dto: { id: number; encashmentId: number }) {
    return this.service.isCashier(dto.id, dto.encashmentId);
  }
  @Put('isAdmin')
  isAdmin(@Body() dto: { id: number }) {
    return this.service.isAdmin(dto.id);
  }
  @Put('update')
  update(@Body() dto: updateEncashment) {
    return this.service.update(dto);
  }
  @Get('get-cashier/:id')
  getForCashier(@Param('id') id: string) {
    return this.service.getForCashier(parseInt(id));
  }
  @Get('get-admin')
  getForAdmin() {
    return this.service.getForAdmin();
  }
  @Get('get-admin/:id')
  getByIdForAdmin(@Param('id') id: string) {
    return this.service.getByIdForAdmin(parseInt(id));
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
