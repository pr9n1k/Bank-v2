import {
  createDepartment,
  queryPagination,
  updateBankInfo,
} from '@bank-v2/interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private service: DepartmentService) {}

  @Post('add')
  create(@Body() dto: createDepartment) {
    return this.service.create(dto);
  }

  @Get('get')
  get(@Query() query?: queryPagination) {
    return this.service.get(query);
  }

  @Get('get-bank')
  getBank() {
    return this.service.getBank();
  }
  @Get('get-bank/info')
  getInfoBank() {
    return this.service.getInfoBank();
  }
  @Get('get/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(parseInt(id));
  }
  @Get('get-employee/:id')
  getByIdEmployee(@Param('id') id: string) {
    return this.service.getByIdEmployee(parseInt(id));
  }
  @Put('')
  updateBankInfo(@Body() dto: updateBankInfo) {
    return this.service.updateBank(dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
