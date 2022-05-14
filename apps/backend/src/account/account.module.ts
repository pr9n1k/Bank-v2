import { Module } from '@nestjs/common';
import { AccountDepartmentModule } from './account-department/account-department.module';
import { IndividualModule } from './individual/individual.module';
import { LegalModule } from './legal/legal.module';

@Module({
  imports: [
    AccountDepartmentModule,
    IndividualModule,
    LegalModule,
  ],
})
export class AccountModule {}
