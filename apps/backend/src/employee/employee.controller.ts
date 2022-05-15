import {
  createEmployee,
  queryPagination,
  updateEmployee,
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
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Post('add')
  create(@Body() dto: createEmployee) {
    return this.service.create(dto);
  }

  @Get('get')
  get(@Query() query: queryPagination) {
    return this.service.get(query);
  }

  @Get('get/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(parseInt(id));
  }

  @Get('get-department/:id')
  getByIdDepartment(@Param('id') id: string, @Query() query?: queryPagination) {
    return this.service.getByIdDepartment(parseInt(id), query);
  }

  @Get('get-bank')
  getByBank(@Query() query?: queryPagination) {
    return this.service.getByBank(query);
  }
  @Get('get-admin')
  getByAdmin() {
    return this.service.getAdmin();
  }

  @Get('admin')
  getAdmin() {
    return this.service.getAdmin();
  }

  @Get('get-not-work')
  getNotWork(@Query() query?: queryPagination) {
    return this.service.getNotWork(query);
  }

  @Put()
  update(@Body() dto: updateEmployee) {
    return this.service.update(dto);
  }

  @Put('routate/:id')
  routate(@Param('id') id: string) {
    return this.service.routate(parseInt(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
