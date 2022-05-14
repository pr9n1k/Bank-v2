import { Module, Global } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { IndividualController } from './individual.controller';
@Global()
@Module({
  providers: [IndividualService],
  controllers: [IndividualController],
  exports: [IndividualService],
})
export class IndividualModule {}
