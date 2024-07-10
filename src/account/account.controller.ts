import { Controller, Body, Put, Get, Param, NotFoundException } from '@nestjs/common';

import { AccountService } from '../account/account.service';
import { UpdateAccountTransactionDTO } from './DTO/updateAccountTransaction.dto';
import { Transactions } from '../entities/Transactions';
import { Account } from '../entities/Account';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly clientService: AccountService,
    private accountService: AccountService,
  ) {}

  @Get(':id/credit')
  async getCredit(@Param('id') id: number): Promise<number> {
    const account = await this.accountService.findOne(id);
    if (!account) {
      throw new NotFoundException('La cuenta no se encontró');
    }
    return account.cash;
  }

  @Get('latestTransactions/:id')
  async latestTransactions(@Param('id') id: number): Promise<Transactions[]> {
    const trs: Transactions[] = await this.accountService.seeTrans(id);
    return trs;
  }

  @Put('transaction')
  async makeTransaction(@Body() transDTO: UpdateAccountTransactionDTO): Promise<Transactions> {
    return this.accountService.transaction(transDTO);
  }
}
