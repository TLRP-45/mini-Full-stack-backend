import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../../entities/Client';
import { Bank } from '../../entities/Bank';
import { Account } from '../../entities/Account';
import { Transactions } from '../../entities/Transactions';


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 't4j.h.filess.io',
  port: 3307,
  username: 'bancoSntndr_frozenever',
  password: 'a0e05ae3a84c0ce27bf8fc736242cdabd02b2084',
  database: 'bancoSntndr_frozenever',
  entities: [
    Client,
    Bank,
    Account,
    Transactions,
  ],
  synchronize: true,
};