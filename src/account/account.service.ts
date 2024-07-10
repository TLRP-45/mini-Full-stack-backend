import {BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/Account';
import { Client } from '../entities/Client';
import { Bank } from '../entities/Bank';
import { UpdateAccountTransactionDTO } from './DTO/updateAccountTransaction.dto';
import { Transactions } from '../entities/Transactions';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(Bank)
    private bankRepo: Repository<Bank>,
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
  ) {}

  async createAccount(client: Client, type: string): Promise<Account> {
    const newAccount = new Account();
    const bankId = 100;
    const bank = await this.bankRepo.findOne({
      where: { bankId: bankId },
    });
    newAccount.accNumber = Math.floor(Math.random() * 1000000000);
    newAccount.type = type;
    newAccount.cash = 0;
    newAccount.status = true;
    newAccount.clientId = client.clientId;
    newAccount.bankId = bank.bankId;

    return this.accountRepo.save(newAccount);
  }

  async getClientsAccounts(clientId: number): Promise<Account[]> {
    return this.accountRepo
      .createQueryBuilder('Account')
      .where('Account.clientId = :id', { id: clientId })
      .andWhere('Account.status = true')
      .getMany();
  }

  async existsAccount(accNumber: number): Promise<boolean> {
    return this.accountRepo.existsBy({
      accNumber: accNumber,
      status: true
    });
  }

  async findOne(accNumber: number): Promise<Account> {
    return this.accountRepo.findOneBy({
      accNumber: accNumber,
      status: true
    });
  }

  async transaction(transDTO: UpdateAccountTransactionDTO): Promise<Transactions> {
    if (transDTO.idAccRemitent == transDTO.idAccReciver) {
      throw new BadRequestException('No se puede transferir dinero a su misma cuenta, no tiene sentido');
    }
    if (transDTO.transAmountValue <= 0) {
      throw new BadRequestException('Cantidad invalida, no se puede transferir cifras negativas ni el cero');
    }
    const senderAccount = await this.findOne(transDTO.idAccRemitent);
    const reciverAccount = await this.findOne(transDTO.idAccReciver);
    if (!senderAccount || !reciverAccount) {
      throw new NotFoundException('La cuenta no se encontró');
    }
    if (senderAccount.cash < transDTO.transAmountValue) {
      throw new UnauthorizedException(
        'No tienes suficiente saldo para transferir',
      );
    }
    senderAccount.cash -= transDTO.transAmountValue;
    reciverAccount.cash += transDTO.transAmountValue;
    let trans = new Transactions();
    trans.amount = transDTO.transAmountValue;
    trans.type = 'Transaction';
    trans.date = new Date();
    trans.givesToAccount = transDTO.idAccRemitent;
    trans.recievesToAccount = transDTO.idAccReciver;
    trans.senderAccount = senderAccount;
    trans.reciverAccount = reciverAccount;
    this.accountRepo.save([senderAccount, reciverAccount]);
    this.transactionsRepo.save(trans);
    return trans;
  }

  async seeTrans(id: number): Promise<Transactions[]> {
    let trs = await this.transactionsRepo.findBy({
      givesToAccount: id
    });
    return trs
  }
}
