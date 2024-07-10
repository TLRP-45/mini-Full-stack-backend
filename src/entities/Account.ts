import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Client } from "./Client";
import { Bank } from "./Bank";
import { Transactions } from "./Transactions";

@Index("PkAccount", ["accNumber"], { unique: true })
@Entity("Account", { schema: "dbo" })
export class Account {
  @Column("varchar", { name: "Type", length: 30 })
  type: string;

  @Column("int", { primary: true, name: "AccNumber" })
  accNumber: number;

  @Column("int", { name: "Cash" })
  cash: number;

  @Column("bool", { name: "Status" })
  status: boolean;

  @ManyToOne(() => Client, (client) => client.accounts)
  @JoinColumn([{ name: "ClientId", referencedColumnName: "clientId" }])
  clientId: number;

  @ManyToOne(() => Bank, (bank) => bank.accounts)
  @JoinColumn([{ name: "BankId", referencedColumnName: "bankId" }])
  bankId: number;

  @OneToMany(
    () => Transactions,
    (transactions) => transactions.recievesToAccount
  )
  transactions: Transactions[];

  @OneToMany(() => Transactions, (transactions) => transactions.givesToAccount)
  otherTransactions: Transactions[];
}
