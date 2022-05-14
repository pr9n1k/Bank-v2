import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { EmployeeModule } from './employee/employee.module';
import { ClientModule } from './client/client.module';
import { DepartmentModule } from './department/department.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { OperationModule } from './operation/operation.module';
import { CommunalModule } from './communal/communal.module';
import { EncashmentModule } from './encashment/encashment.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    ClientModule,
    DepartmentModule,
    AccountModule,
    AuthModule,
    OperationModule,
    CommunalModule,
    EncashmentModule,
  ],
  providers: [],
})
export class AppModule {}
