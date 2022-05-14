import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { EmployeeService } from './../employee/employee.service';
import { AccountDepartmentService } from '../account/account-department/account-department.service';
import { LegalService } from './../account/legal/legal.service';
import { IndividualService } from './../account/individual/individual.service';

@Module({
  imports: [
    EmployeeService,
    AccountDepartmentService,
    LegalService,
    IndividualService,
  ],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
