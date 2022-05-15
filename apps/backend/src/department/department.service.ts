import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { DepartmentType } from '@prisma/client';
import {
  createDepartment,
  queryPagination,
  updateBankInfo,
} from '@bank-v2/interface';
import { EmployeeService } from '../employee/employee.service';
import { CurrencyArray } from '@bank-v2/const';

@Injectable()
export class DepartmentService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountDepartmentService,
    private employeeService: EmployeeService
  ) {}
  async create(dto: createDepartment) {
    let type: DepartmentType;
    const countDepartment = await this.prisma.department.count();
    if (countDepartment === 0) {
      type = DepartmentType.BANK;
    } else {
      type = DepartmentType.DEPARTMENT;
    }
    const candidate = await this.prisma.department.findUnique({
      where: {
        number: dto.number,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Отделение с таким номер`,
        HttpStatus.BAD_REQUEST
      );
    }
    const department = await this.prisma.department.create({
      data: {
        ...dto,
        type,
      },
    });
    CurrencyArray.map((item) => {
      this.accountService.create({
        departmentId: department.id,
        currency: item,
      });
    });
    return department;
  }
  async get(dto?: queryPagination) {
    const total = await this.prisma.department.count({
      where: {
        NOT: {
          OR: [
            {
              type: DepartmentType.BANK,
            },
            {
              isWork: false,
            },
          ],
        },
      },
    });
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const departments = await this.prisma.department.findMany({
      where: {
        NOT: {
          OR: [
            {
              type: DepartmentType.BANK,
            },
            {
              isWork: false,
            },
          ],
        },
      },
      skip: page * limit,
      take: limit,
    });
    return { value: departments, total };
  }
  async getById(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    if (id === 0) {
      return null;
    }
    return await this.prisma.department.findUnique({
      where: {
        id,
      },
    });
  }
  async getByIdEmployee(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    const employee = await this.employeeService.getById(id);
    return await this.prisma.department.findUnique({
      where: {
        id: employee.departmentId,
      },
    });
  }
  async getBank() {
    return this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
  }
  async getInfoBank() {
    const bank = await this.prisma.department.findFirst({
      where: {
        type: DepartmentType.BANK,
      },
    });
    const countEmployee = await this.prisma.employee.count({
      where: {
        isWork: true,
        NOT: {
          departmentId: bank.id,
        },
      },
    });
    const countDepartment = await this.prisma.department.count({
      where: {
        isWork: true,
        NOT: {
          id: bank.id,
        },
      },
    });
    const account = await this.prisma.accountDepartment.findMany({
      where: {
        departmentId: bank.id,
      },
    });
    return {
      bank,
      employee: countEmployee,
      department: countDepartment,
      value: account,
    };
  }
  async updateBank(dto: updateBankInfo) {
    const bank = await this.getBank();
    const candidate = await this.prisma.department.findFirst({
      where: {
        number: dto.number,
        NOT: {
          id: bank.id,
        },
      },
    });
    if (candidate) {
      throw new HttpException(
        'Отделение с таким номером уже существует',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.department.update({
      where: { id: bank.id },
      data: {
        ...dto,
      },
    });
  }
  async remove(id: number) {
    const department = await this.getById(id);
    const accountDepartment = await this.accountService.getByIdDepartment(id);
    const employees = await this.prisma.employee.findMany({
      where: {
        departmentId: id,
      },
    });
    if (employees.length) {
      throw new HttpException(
        'Освободите отделение от сотрудников',
        HttpStatus.BAD_REQUEST
      );
    }
    accountDepartment.forEach((item) => {
      if (item.money !== 0) {
        throw new HttpException(
          'Сделайте инкассацию отделения',
          HttpStatus.BAD_REQUEST
        );
      }
    });
    await this.prisma.accountDepartment.deleteMany({
      where: {
        departmentId: id,
      },
    });
    const response = await this.prisma.department.update({
      where: {
        id,
      },
      data: {
        isWork: false,
        number: `delete-${department.number}`,
      },
    });
    return response;
  }
}
