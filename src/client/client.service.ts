import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/Client';
import { CreateClientDto } from './DTO/CreateClient.dto';
import { UpdateClientDto } from './DTO/UpdateClient.dto';
import { DisableAccountDTO } from '../account/DTO/disableAccount.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
    private accountService: AccountService,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepo.findBy({
      status: true
    });
  }

  async findOne(id: number): Promise<Client> {
    return this.clientRepo.findOne({
      where: { rut: id, status:true }
    });
  }

  async findOneId(id: number): Promise<Client> {
    return this.clientRepo.findOne({
      where: { clientId: id, status:true }
    });
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(createClientDto);
    return this.clientRepo.save(client);
  }

  async update(id: number, updateClienteDto: UpdateClientDto): Promise<void> {
    await this.clientRepo.update(id, updateClienteDto);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepo.delete(id);
  }
  
}
