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
  async get(dto: queryPagination) {
    const total = await this.prisma.employee.count({
      where: {
        NOT: {
          role: Role.ADMIN,
        },
        isWork: true,
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const employee = await this.prisma.employee.findMany({
      where: {
        NOT: {
          role: Role.ADMIN,
        },
        isWork: true,
      },
      skip: page * limit,
      take: limit,
    });
    return { value: employee, total };
  }

  async getById(id: number) {
    return await this.prisma.employee.findUnique({
      where: { id },
    });
  }
  async getByIdDepartment(id: number, dto?: queryPagination) {
    const total = await this.prisma.employee.count({
      where: {
        departmentId: id,
        isWork: true,
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const employee = await this.prisma.employee.findMany({
      where: {
        departmentId: id,
        NOT: {
          role: Role.ADMIN,
        },
        isWork: true,
      },
      skip: page * limit,
      take: limit,
    });
    return { value: employee, total };
  }
  async getByBank(dto?: queryPagination) {
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    const total = await this.prisma.employee.count({
      where: {
        departmentId: bank.id,
        isWork: true,
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total.toString() : dto.limit;
    const page = parseInt(dto.limit) && parseInt(dto.page) ? dto.page : '0';
    const employee = await this.getByIdDepartment(bank.id, { limit, page });
    return { value: employee.value, total };
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
  async getNotWork(dto?: queryPagination) {
    const total = await this.prisma.employee.count({
      where: {
        isWork: false,
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const employee = await this.prisma.employee.findMany({
      where: {
        isWork: false,
      },
      skip: page * limit,
      take: limit,
    });
    return { value: employee, total };
  }
  async routate(id: number) {
    const candidate = await this.getById(id);
    if (!candidate) {
      throw new HttpException('Сотрудник не найден', HttpStatus.BAD_REQUEST);
    }
    if (candidate.login === `delete-${id}`) {
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
        login: `delete-${id}`,
      },
    });
  }
}
