import {
  createAccountDepartment,
  updateAccountsBank,
} from '@bank-v2/interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountDepartmentService } from './account-department.service';

@Controller('account-department')
export class AccountDepartmentController {
  constructor(private service: AccountDepartmentService) {}

  @Post('add')
  create(@Body() dto: createAccountDepartment) {
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
  @Get('get-department/:id')
  getByIdDepartment(@Param('id') id: string) {
    return this.service.getByIdDepartment(parseInt(id));
  }

  @Get('get-employee/:id')
  getByIdEmployee(@Param('id') id: string) {
    return this.service.getByIdEmployee(parseInt(id));
  }

  @Get('get-number/:number')
  getByNumber(@Param('number') number: string) {
    return this.service.getByNumber(number);
  }

  @Put('')
  updateBank(@Body() dto: updateAccountsBank) {
    return this.service.updateBank(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
