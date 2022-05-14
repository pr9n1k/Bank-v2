import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { createCommunal, createDataCommunal } from '@bank-v2/interface';
import { randomString } from './../utils/util-random';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { LegalService } from './../account/legal/legal.service';
import { Currency } from '@prisma/client';
import { DepartmentService } from './../department/department.service';

@Injectable()
export class CommunalService {
  constructor(
    private prisma: PrismaService,
    private accountDepartmentService: AccountDepartmentService,
    private legalService: LegalService,
    private departmentService: DepartmentService
  ) {}

  async create(dto: createCommunal) {
    const number = randomString();
    const department = await this.departmentService.getByIdEmployee(
      dto.employeeId
    );
    const accountDepartment =
      await this.accountDepartmentService.getByIdEmployee(dto.employeeId);
    let summa = 0;
    const accCommunals = await this.legalService.getCommunal();
    dto.dataCommunal.forEach((data) => {
      accCommunals.forEach((acc) => {
        if (acc.type === data.communalType) {
          this.legalService.update({
            id: acc.id,
            money: acc.money + data.money,
          });
          summa += data.money;
        }
      });
    });
    accountDepartment.forEach((item) => {
      if (item.currency === Currency.RUB) {
        this.accountDepartmentService.update({
          id: item.id,
          money: item.money + summa,
        });
      }
    });
    const communal = await this.prisma.communal.create({
      data: {
        city: dto.city,
        house: dto.house,
        name: dto.name,
        street: dto.street,
        surname: dto.surname,
        employeeId: dto.employeeId,
        flat: dto.flat,
        patronymic: dto.patronymic,
        number,
        departmentId: department.id,
      },
    });
    dto.dataCommunal.forEach((item) => {
      this.createData(communal.id, item);
    });
    return communal;
  }
  async get() {
    return await this.prisma.communal.findMany();
  }
  async createData(id: number, dto: createDataCommunal) {
    return this.prisma.communalData.create({
      data: { ...dto, communalId: id },
    });
  }
  async deleteAll() {
    await this.prisma.communalData.deleteMany();
    await this.prisma.communal.deleteMany();
  }
}
