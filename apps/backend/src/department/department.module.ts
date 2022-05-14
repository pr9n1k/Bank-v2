import { Global, Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { EmployeeService } from '../employee/employee.service';

@Global()
@Module({
  imports: [AccountDepartmentService, EmployeeService],
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [DepartmentService],
})
export class DepartmentModule {}
