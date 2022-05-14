import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { generateNumberAccount } from '../../utils/util-random';
import { createLegal, updateLegal } from '@bank-v2/interface';
import { LegalType } from '@prisma/client';
import { legalConst } from '@bank-v2/const';

@Injectable()
export class LegalService {
  constructor(private prisma: PrismaService) {}
  async create(dto: createLegal) {
    if (dto.type !== LegalType.COMPANY) {
      const legal = await this.prisma.legal.findFirst({
        where: {
          type: dto.type,
        },
      });
      if (legal) {
        throw new HttpException(
          'Счет с таким типом уже зарегестрирован',
          HttpStatus.BAD_REQUEST
        );
      }
    }
    const accounts = await this.prisma.legal.findMany();
    const number = generateNumberAccount(accounts, legalConst);
    return await this.prisma.legal.create({
      data: {
        ...dto,
        number,
      },
    });
  }
  async get() {
    const account = await this.prisma.legal.findMany();
    return account;
  }
  async getById(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.legal.findUnique({
      where: {
        id,
      },
    });
  }
  async getByIdClient(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.legal.findMany({
      where: {
        clientId: id,
      },
    });
  }
  async getByNumber(number: string) {
    if (!number) {
      throw new HttpException('Номер не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.legal.findUnique({
      where: {
        number,
      },
    });
  }
  async getCommunal() {
    return this.prisma.legal.findMany({
      where: {
        NOT: {
          type: LegalType.COMPANY,
        },
      },
    });
  }
  async update(dto: updateLegal) {
    return this.prisma.legal.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
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
    return await this.prisma.legal.delete({
      where: {
        id,
      },
    });
  }
}
