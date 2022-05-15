import {
  createEncashment,
  createEncashmentValue,
  queryPagination,
  updateEncashment,
} from '@bank-v2/interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DepartmentService } from './../department/department.service';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { TypeEncashment } from '@prisma/client';

@Injectable()
export class EncashmentService {
  constructor(
    private prisma: PrismaService,
    private departmentSevice: DepartmentService,
    private accountSerivce: AccountDepartmentService
  ) {}
  async create(dto: createEncashment) {
    const department = await this.departmentSevice.getByIdEmployee(
      dto.operatorId
    );
    const candidate = await this.prisma.encashment.findMany({
      where: {
        departmentId: department.id,
        OR: [
          {
            isAdmin: false,
          },
          {
            isCashier: false,
          },
        ],
      },
    });
    if (candidate.length) {
      throw new HttpException(
        'Еще висит старая инкассация',
        HttpStatus.BAD_REQUEST
      );
    }
    //Если инкассация проверка на то, чтобы хватило денег
    if (dto.type === TypeEncashment.ENCASHMENT) {
      const account = await this.accountSerivce.getByIdDepartment(
        department.id
      );
      dto.encashmentValue.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency && item.money > acc.money) {
            throw new HttpException(
              `В кассе не хватает валюты ${acc.currency}`,
              HttpStatus.BAD_REQUEST
            );
          }
        });
      });
    }
    const encashment = await this.prisma.encashment.create({
      data: {
        isAdmin: false,
        isCashier: false,
        type: dto.type,
        departmentId: department.id,
        operatorId: dto.operatorId,
      },
    });
    dto.encashmentValue.map((item) => {
      this.createValue(encashment.id, item);
    });
    return encashment;
  }
  async isCashier(id: number, encashmentId: number) {
    const encashment = await this.prisma.encashment.findUnique({
      where: {
        id: encashmentId,
      },
    });
    const department = await this.departmentSevice.getByIdEmployee(id);
    const value = await this.prisma.valueEncashment.findMany({
      where: {
        encashmentId,
      },
    });
    const account = await this.accountSerivce.getByIdDepartment(department.id);
    if (encashment.type === TypeEncashment.ENCASHMENT) {
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency && item.money > acc.money) {
            throw new HttpException(
              `Не хватает денег валюты ${acc.currency}`,
              HttpStatus.BAD_REQUEST
            );
          }
        });
      });
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency) {
            this.accountSerivce.update({
              id: acc.id,
              money: acc.money - item.money,
            });
          }
        });
      });
    } else {
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency) {
            this.accountSerivce.update({
              id: acc.id,
              money: acc.money + item.money,
            });
          }
        });
      });
    }
    return await this.prisma.encashment.update({
      where: {
        id: encashmentId,
      },
      data: {
        cashierId: id,
        isCashier: true,
      },
    });
  }
  async isAdmin(id: number) {
    const encashment = await this.prisma.encashment.findUnique({
      where: {
        id,
      },
    });
    const bank = await this.departmentSevice.getBank();
    const value = await this.prisma.valueEncashment.findMany({
      where: {
        encashmentId: id,
      },
    });
    const account = await this.accountSerivce.getByIdDepartment(bank.id);
    if (encashment.type === TypeEncashment.ENCASHMENT) {
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency) {
            this.accountSerivce.update({
              id: acc.id,
              money: acc.money + item.money,
            });
          }
        });
      });
    } else {
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency && item.money > acc.money) {
            throw new HttpException(
              `Не хватает денег валюты ${acc.currency}`,
              HttpStatus.BAD_REQUEST
            );
          }
        });
      });
      value.forEach((item) => {
        account.forEach((acc) => {
          if (item.currency === acc.currency) {
            this.accountSerivce.update({
              id: acc.id,
              money: acc.money - item.money,
            });
          }
        });
      });
    }
    return await this.prisma.encashment.update({
      where: {
        id: id,
      },
      data: {
        isAdmin: true,
      },
    });
  }
  async getForCashier(id: number) {
    const department = await this.departmentSevice.getByIdEmployee(id);
    const encashment = await this.prisma.encashment.findFirst({
      where: {
        departmentId: department.id,
        isCashier: false,
      },
    });
    if (!encashment) {
      return null;
    }
    const value = await this.prisma.valueEncashment.findMany({
      where: {
        encashmentId: encashment.id,
      },
    });
    if (encashment.type === TypeEncashment.ENCASHMENT) {
      return {
        ...encashment,
        ValueEncashment: value,
      };
    } else if (
      encashment.type === TypeEncashment.REINFORCEMENT &&
      encashment.isAdmin === true
    ) {
      return {
        ...encashment,
        ValueEncashment: value,
      };
    }
    return null;
  }
  async getForAdmin(dto?: queryPagination) {
    const total = await this.prisma.encashment.count({
      where: {
        isAdmin: false,
        OR: [
          {
            type: TypeEncashment.ENCASHMENT,
            isCashier: true,
          },
          {
            type: TypeEncashment.REINFORCEMENT,
            isCashier: false,
          },
        ],
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const encashment = await this.prisma.encashment.findMany({
      where: {
        isAdmin: false,
        OR: [
          {
            type: TypeEncashment.ENCASHMENT,
            isCashier: true,
          },
          {
            type: TypeEncashment.REINFORCEMENT,
            isCashier: false,
          },
        ],
      },
      skip: page * limit,
      take: limit,
    });
    return { value: encashment, total };
  }
  async getByIdForAdmin(id: number) {
    const encashment = await this.prisma.encashment.findUnique({
      where: { id },
    });
    const value = await this.prisma.valueEncashment.findMany({
      where: {
        encashmentId: encashment.id,
      },
    });
    return {
      ...encashment,
      ValueEncashment: value,
    };
  }
  async getByIdEmployee(id: number) {
    const department = await this.departmentSevice.getByIdEmployee(id);
    const encashment = await this.prisma.encashment.findFirst({
      where: {
        departmentId: department.id,
      },
    });
    const encashmentValue = await this.prisma.valueEncashment.findMany({
      where: {
        encashmentId: encashment.id,
      },
    });
    return {
      ...encashment,
      ValueEncashment: encashmentValue,
    };
  }
  async update(dto: updateEncashment) {
    dto.value.forEach(async (item) => {
      await this.prisma.valueEncashment.update({
        where: {
          id: item.id,
        },
        data: {
          money: item.money,
        },
      });
    });
  }
  async remove(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    const candidate = await this.prisma.encashment.findUnique({
      where: { id },
    });
    if (candidate.isAdmin === true || candidate.isCashier === true) {
      throw new HttpException(
        'Операция подтверждена одним из сотрудников',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.encashment.delete({
      where: { id },
    });
  }
  async createValue(id: number, dto: createEncashmentValue) {
    return await this.prisma.valueEncashment.create({
      data: { ...dto, encashmentId: id },
    });
  }
}
