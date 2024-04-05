import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
