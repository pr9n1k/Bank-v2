import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  createOperation,
  operationConfirm,
  queryPagination,
} from '@bank-v2/interface';
import { randomString } from './../utils/util-random';
import { EmployeeService } from './../employee/employee.service';
import { AccountDepartmentService } from './../account/account-department/account-department.service';
import { LegalService } from './../account/legal/legal.service';
import { IndividualService } from './../account/individual/individual.service';
import { TypeOperation, Legal, Individual } from '@prisma/client';

@Injectable()
export class OperationService {
  constructor(
    private prisma: PrismaService,
    private employeeService: EmployeeService,
    private accountDepartmentService: AccountDepartmentService,
    private legalService: LegalService,
    private individualService: IndividualService
  ) {}

  async create(dto: createOperation) {
    const numberOperation = randomString();
    const employee = await this.employeeService.getById(dto.employeeId);
    const department = await this.prisma.department.findFirst({
      where: {
        id: employee.departmentId,
      },
    });
    const accountDepartment =
      await this.accountDepartmentService.getByIdDepartment(department.id);
    let accontClient: Legal | Individual;
    const individualAccount = await this.individualService.getByNumber(
      dto.numberAccount
    );
    const legalAccount = await this.legalService.getByNumber(dto.numberAccount);
    if (individualAccount) {
      accontClient = individualAccount;
    } else if (legalAccount) {
      accontClient = legalAccount;
    } else {
      throw new HttpException('Номер счета не верный', HttpStatus.BAD_REQUEST);
    }
    if (dto.type === TypeOperation.EXPENSE) {
      accountDepartment.forEach((item) => {
        if (item.currency === dto.currency && item.money < dto.money) {
          throw new HttpException(
            'В кассе не достаточно средств',
            HttpStatus.BAD_REQUEST
          );
        }
      });
      if (accontClient.money < dto.money) {
        throw new HttpException(
          'У клиента недостаточно средств',
          HttpStatus.BAD_REQUEST
        );
      }
    }
    return this.prisma.operation.create({
      data: {
        ...dto,
        departmentId: department.id,
        isConfirm: false,
        number: numberOperation,
      },
    });
  }
  async get(dto?: queryPagination) {
    const total = await this.prisma.operation.count();
    const limit =
      !parseInt(dto.limit) || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page =
      parseInt(dto.limit) && parseInt(dto.page) ? parseInt(dto.page) : 0;
    const operation = await this.prisma.operation.findMany({
      skip: page * limit,
      take: limit,
    });
    return { value: operation, total };
  }
  async getById(id: number) {
    return await this.prisma.operation.findUnique({
      where: { id },
    });
  }
  async getByNotConfirm(id: number, dto?: queryPagination) {
    if (!id) {
      throw new HttpException('id не указан', HttpStatus.BAD_REQUEST);
    }
    const employee = await this.employeeService.getById(id);
    const total = await this.prisma.operation.count({
      where: {
        departmentId: employee.departmentId,
        isConfirm: false,
      },
    });
    const limit =
      !dto.limit || dto.limit === '-1' ? total : parseInt(dto.limit);
    const page = dto.limit && dto.page ? parseInt(dto.page) : 0;
    const operation = await this.prisma.operation.findMany({
      where: {
        departmentId: employee.departmentId,
        isConfirm: false,
      },
      skip: page * limit,
      take: limit,
    });
    return { value: operation, total };
  }
  async confirm(dto: operationConfirm) {
    const operation = await this.getById(dto.id);
    const accountDepartments =
      await this.accountDepartmentService.getByIdEmployee(dto.cashierId);
    const accountDepartment = accountDepartments.filter(
      (item) => item.currency === operation.currency
    )[0];
    const candidateLegal = await this.legalService.getByNumber(
      operation.numberAccount
    );
    const candidateIndividual = await this.individualService.getByNumber(
      operation.numberAccount
    );

    if (operation.type === TypeOperation.EXPENSE) {
      if (accountDepartment.money < operation.money) {
        throw new HttpException(
          'В кассе недостаточно средств',
          HttpStatus.BAD_REQUEST
        );
      }
      if (candidateLegal && candidateLegal.money > operation.money) {
        await this.prisma.legal.update({
          where: { id: candidateLegal.id },
          data: {
            money: candidateLegal.money - operation.money,
          },
        });
      } else if (
        candidateIndividual &&
        candidateIndividual.money >= operation.money
      ) {
        await this.prisma.individual.update({
          where: { id: candidateIndividual.id },
          data: {
            money: candidateIndividual.money - operation.money,
          },
        });
      } else {
        throw new HttpException(
          'Счет не найден или недостаточно средств',
          HttpStatus.BAD_REQUEST
        );
      }
      await this.prisma.accountDepartment.update({
        where: {
          id: accountDepartment.id,
        },
        data: {
          money: accountDepartment.money - operation.money,
        },
      });
    } else {
      if (candidateLegal) {
        await this.prisma.legal.update({
          where: { id: candidateLegal.id },
          data: {
            money: candidateLegal.money + operation.money,
          },
        });
      } else if (candidateIndividual) {
        await this.prisma.individual.update({
          where: { id: candidateIndividual.id },
          data: {
            money: candidateIndividual.money + operation.money,
          },
        });
      } else {
        throw new HttpException('Счет не найден', HttpStatus.BAD_REQUEST);
      }
      await this.prisma.accountDepartment.update({
        where: {
          id: accountDepartment.id,
        },
        data: {
          money: accountDepartment.money + operation.money,
        },
      });
    }
    return await this.prisma.operation.update({
      where: { id: dto.id },
      data: {
        cashierId: dto.cashierId,
        isConfirm: true,
      },
    });
  }
}
