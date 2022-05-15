import { createClient, queryPagination } from '@bank-v2/interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private service: ClientService) {}

  @Post('add')
  create(@Body() dto: createClient) {
    return this.service.create(dto);
  }

  @Get('/get')
  get(@Query() query?: queryPagination) {
    return this.service.get(query);
  }
  @Get('get/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(parseInt(id));
  }
  @Put(':id')
  update(@Body() dto: createClient, @Param('id') id: string) {
    return this.service.update(parseInt(id), dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
