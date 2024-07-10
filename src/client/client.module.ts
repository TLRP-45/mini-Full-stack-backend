import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entities/Client';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AccountService } from '../account/account.service';
import { Account } from '../entities/Account';
import { Bank } from '../entities/Bank';
import { Transactions } from '../entities/Transactions';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Account, Bank, Transactions])],
  providers: [ClientService, AccountService],
  controllers: [ClientController],
})
export class ClientModule {}