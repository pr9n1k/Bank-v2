import { Module } from '@nestjs/common';
import { CommunalService } from './communal.service';
import { CommunalController } from './communal.controller';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { LegalService } from './../account/legal/legal.service';
import { DepartmentService } from './../department/department.service';

@Module({
  imports: [AccountDepartmentService, LegalService, DepartmentService],
  providers: [CommunalService],
  controllers: [CommunalController],
})
export class CommunalModule {}
