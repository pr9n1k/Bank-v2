import { Module, Global } from '@nestjs/common';
import { LegalService } from './legal.service';
import { LegalController } from './legal.controller';
@Global()
@Module({
  providers: [LegalService],
  controllers: [LegalController],
  exports: [LegalService],
})
export class LegalModule {}
