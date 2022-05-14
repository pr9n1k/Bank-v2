import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { generateNumberAccount } from '../../utils/util-random';
import { createIndividual } from '@bank-v2/interface';
import { individualConst } from '@bank-v2/const';

@Injectable()
export class IndividualService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createIndividual) {
    const accounts = await this.prisma.individual.findMany();
    const number = generateNumberAccount(accounts, individualConst);
    return await this.prisma.individual.create({
      data: {
        ...dto,
        number,
      },
    });
  }
  async get() {
    const account = await this.prisma.individual.findMany();
    return account;
  }
  async getById(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.individual.findUnique({
      where: {
        id,
      },
    });
  }
  async getByIdClient(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.individual.findMany({
      where: {
        clientId: id,
      },
    });
  }
  async getByNumber(number: string) {
    if (!number) {
      throw new HttpException('Номер не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.individual.findUnique({
      where: {
        number,
      },
    });
  }
  async remove(id: number) {
    const candidate = await this.getById(id);
    if (candidate.money !== 0) {
      throw new HttpException(
        'Снимите деньги со счета',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.individual.delete({
      where: {
        id,
      },
    });
  }
}
