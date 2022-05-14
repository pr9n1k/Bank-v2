import { Global, Module } from '@nestjs/common';
import { AccountDepartmentService } from './account-department.service';
import { AccountDepartmentController } from './account-department.controller';

@Global()
@Module({
  providers: [AccountDepartmentService],
  controllers: [AccountDepartmentController],
  exports: [AccountDepartmentService],
})
export class AccountDepartmentModule {}
