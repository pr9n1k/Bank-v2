import { departmentConst } from '@bank-v2/const';
import {
  createAccountDepartment,
  updateAccountDepartment,
  updateAccountsBank,
  updateTypeAccountBank,
} from '@bank-v2/interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartmentType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { generateNumberAccount } from '../../utils/util-random';
@Injectable()
export class AccountDepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createAccountDepartment) {
    const accounts = await this.prisma.accountDepartment.findMany();
    const number = generateNumberAccount(accounts, departmentConst);
    return await this.prisma.accountDepartment.create({
      data: {
        ...dto,
        number,
        money: 0,
      },
    });
  }
  async get() {
    const account = await this.prisma.accountDepartment.findMany();
    return account;
  }
  async getById(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.accountDepartment.findUnique({
      where: {
        id,
      },
    });
  }
  async getByIdDepartment(id: number) {
    if (id === 0) {
      return null;
    }
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.accountDepartment.findMany({
      where: {
        departmentId: id,
      },
    });
  }
  async getByIdEmployee(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
    const department = await this.prisma.department.findUnique({
      where: {
        id: employee.departmentId,
      },
    });
    return await this.prisma.accountDepartment.findMany({
      where: {
        departmentId: department.id,
      },
    });
  }
  async getByNumber(number: string) {
    if (!number) {
      throw new HttpException('Номер не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.accountDepartment.findUnique({
      where: {
        number,
      },
    });
  }
  async update(dto: updateAccountDepartment) {
    return await this.prisma.accountDepartment.update({
      where: { id: dto.id },
      data: { money: dto.money },
    });
  }
  async updateBank(dto: updateAccountsBank) {
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    const account = await this.getByIdDepartment(bank.id);
    if (dto.type === updateTypeAccountBank.ADD) {
      dto.value.forEach((value) => {
        account.forEach((acc) => {
          if (acc.currency === value.currency) {
            this.update({ id: acc.id, money: value.money + acc.money });
          }
        });
      });
    } else if (dto.type === updateTypeAccountBank.GET) {
      dto.value.forEach((value) => {
        account.forEach((acc) => {
          if (acc.currency === value.currency) {
            if (acc.money >= value.money) {
              this.update({ id: acc.id, money: value.money + acc.money });
            } else {
              throw new HttpException(
                `Недостаточно денежных средств(${acc.currency})`,
                HttpStatus.BAD_REQUEST
              );
            }
          }
        });
      });
    } else {
      throw new HttpException('Тип не указан', HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: number) {
    return await this.prisma.accountDepartment.delete({
      where: {
        id,
      },
    });
  }
}
