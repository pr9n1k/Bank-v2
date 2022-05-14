import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  createEmployee,
  updateEmployee,
  queryPagination,
} from '@bank-v2/interface';
import { DepartmentType, Role } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createEmployee) {
    const candidate = await this.prisma.employee.findUnique({
      where: {
        login: dto.login,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Сотрудник с таким логином уже зарегистрирован`,
        HttpStatus.BAD_REQUEST
      );
    }
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    const employee = await this.prisma.employee.create({
      data: {
        ...dto,
        departmentId: bank.id,
        isWork: true,
      },
    });
    delete employee.password;
    return employee;
  }
  async get(query: queryPagination) {
    const total = await this.prisma.employee.count();
    if (query.limit === '-1' || !query.limit || !query.page) {
      const employee = await this.prisma.employee.findMany({
        where: {
          NOT: {
            role: Role.ADMIN,
          },
          isWork: true,
        },
      });
      return { total, employee };
    }
    const employee = await this.prisma.employee.findMany({
      where: {
        NOT: {
          role: Role.ADMIN,
        },
        isWork: true,
      },
      skip: parseInt(query.page) * parseInt(query.limit),
      take: parseInt(query.limit),
    });
    return { total, employee };
  }

  async getById(id: number) {
    return await this.prisma.employee.findUnique({
      where: { id },
    });
  }
  async getByIdDepartment(id: number) {
    return await this.prisma.employee.findMany({
      where: {
        departmentId: id,
        NOT: {
          role: Role.ADMIN,
        },
        isWork: true,
      },
    });
  }
  async getByBank() {
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    return this.getByIdDepartment(bank.id);
  }
  async getAdmin() {
    return await this.prisma.employee.findFirst({
      where: {
        role: 'ADMIN',
      },
    });
  }
  async update(dto: updateEmployee) {
    return await this.prisma.employee.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
  }
  async getNotWork() {
    return this.prisma.employee.findMany({
      where: {
        isWork: false,
      },
    });
  }
  async routate(id: number) {
    const candidate = await this.getById(id);
    if (!candidate) {
      throw new HttpException('Сотрудник не найден', HttpStatus.BAD_REQUEST);
    }
    if (candidate.login === `${id}`) {
      throw new HttpException(
        'Сперва обновите данные сотрудника(login)',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.employee.update({
      where: { id },
      data: {
        isWork: true,
      },
    });
  }
  async remove(id: number) {
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    return await this.prisma.employee.update({
      where: { id },
      data: {
        isWork: false,
        departmentId: bank.id,
        login: `${id}`,
      },
    });
  }
}
