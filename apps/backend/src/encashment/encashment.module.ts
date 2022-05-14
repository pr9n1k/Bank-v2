import { Module } from '@nestjs/common';
import { EncashmentService } from './encashment.service';
import { EncashmentController } from './encashment.controller';
import { DepartmentService } from '../department/department.service';
import { AccountDepartmentService } from './../account/account-department/account-department.service';

@Module({
  imports: [DepartmentService, AccountDepartmentService],
  providers: [EncashmentService],
  controllers: [EncashmentController],
})
export class EncashmentModule {}
