import { Column, Entity, Index, OneToMany } from "typeorm";
import { Account } from "./Account";

@Index("PkBank", ["bankId"], { unique: true })
@Entity("Bank", { schema: "dbo" })
export class Bank {
  @Column("varchar", { name: "Name", length: 30 })
  name: string;

  @Column("int", { primary: true, name: "BankId" })
  bankId: number;

  @OneToMany(() => Account, (account) => account.bankId)
  accounts: Account[];
}
