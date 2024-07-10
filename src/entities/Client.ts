import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Index("PkClient", ["clientId"], { unique: true })
@Index("UqClient", ["rut"], { unique: true })
@Entity("Client", { schema: "dbo" })
export class Client {
  @PrimaryGeneratedColumn("increment",{ type: "int", name: "ClientId" })
  clientId: number;

  @Column("varchar", { name: "Password", length: 32 })
  password: string;

  @Column("varchar", { name: "Email", length: 50 })
  email: string;

  @Column("int", { name: "Phone" })
  phone: number;

  @Column("int", { name: "RUT", unique: true })
  rut: number;

  @Column("bool", { name: "Status" })
  status: boolean;

  @Column("varchar", { name: "FullName", length: 50 })
  fullname: string;

  @OneToMany(() => Account, (account) => account.clientId)
  accounts: Account[];
}