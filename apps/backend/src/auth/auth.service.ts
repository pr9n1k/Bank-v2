import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    const countEmployee = await this.prisma.employee.count();
    if (!countEmployee) {
      return {};
    }
    const employee = await this.prisma.employee.findUnique({
      where: {
        login: dto.login,
      },
    });
    if (!employee) {
      throw new HttpException('Логин не верный', HttpStatus.BAD_REQUEST);
    }
    if (employee.password !== dto.password) {
      throw new HttpException('Пароль не верный', HttpStatus.BAD_REQUEST);
    }
    delete employee.password;
    return { ...employee };
  }
}
