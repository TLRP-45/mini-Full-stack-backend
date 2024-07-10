import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Account } from "./Account";

@Index(
  "PkTransaction",
  ["id", "recievesToAccount", "givesToAccount"],
  { unique: true }
)
@Entity("Transactions", { schema: "dbo" })
export class Transactions {
  @Column("int", { primary: true, name: "Id", generated: "increment" })
  id: number;

  @Column("int", { name: "Amount" })
  amount: number;

  @Column("varchar", { name: "Type", length: 30 })
  type: string;

  @Column("datetime", { name: "Date" })
  date: Date;

  @Column("int", { primary: true, name: "RecievesToAccount" })
  recievesToAccount: number;

  @Column("int", { primary: true, name: "GivesToAccount" })
  givesToAccount: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn([{ name: "ReciverAccouunt", referencedColumnName: "accNumber" }])
  reciverAccount: Account;

  @ManyToOne(() => Account, (account) => account.otherTransactions)
  @JoinColumn([{ name: "SenderAccount", referencedColumnName: "accNumber" }])
  senderAccount: Account;
}
