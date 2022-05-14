import { createClient, queryPagination } from '@bank-v2/interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createClient) {
    const candidate = await this.prisma.client.findUnique({
      where: {
        inn: dto.inn,
      },
    });
    if (candidate) {
      throw new HttpException(
        `Клиент с таким инн ${dto.inn} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.client.create({
      data: {
        ...dto,
      },
    });
  }
  async get(dto: queryPagination) {
    const total = await this.prisma.client.count();
    if (dto.limit === '-1' || !dto.limit || !dto.page) {
      const client = await this.prisma.client.findMany();
      return { client, total };
    }
    const client = await this.prisma.client.findMany({
      skip: parseInt(dto.page) * parseInt(dto.limit),
      take: parseInt(dto.limit),
    });
    return { client, total };
  }
  async getById(id: number) {
    if (!id) {
      throw new HttpException('Id не указан', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.client.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, dto: createClient) {
    const candidate = await this.prisma.client.findUnique({
      where: {
        inn: dto.inn,
      },
    });
    if (candidate && candidate.id !== id) {
      throw new HttpException(
        `Такой ИНН ${dto.inn} уже присвоен другому клиенту`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.client.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
  async isAccaunt(id: number) {
    const legal = await this.prisma.legal.findMany({
      where: {
        clientId: id,
      },
    });
    const individual = await this.prisma.individual.findMany({
      where: {
        clientId: id,
      },
    });
    if (legal.length || individual.length) {
      return true;
    } else {
      return false;
    }
  }
  async remove(id: number) {
    const isAccount = await this.isAccaunt(id);
    if (isAccount) {
      throw new HttpException(
        `Необходимо закрыть счета`,
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
