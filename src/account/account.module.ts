import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entities/Client';
import { AccountService } from '../account/account.service';
import { Account } from '../entities/Account';
import { Bank } from '../entities/Bank';
import { AccountController } from './account.controller';
import { Transactions } from '../entities/Transactions';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Account, Bank, Transactions])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}