import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { ClientService } from './client.service';
import { AccountService } from '../account/account.service';
import { CreateClientDto } from './DTO/CreateClient.dto';
import { UpdateClientDto } from './DTO/UpdateClient.dto';
import { Client } from '../entities/Client';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private accountService: AccountService
  ) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    const client = await this.clientService.findOne(+id);
    if (!client) {
      throw new NotFoundException("El cliente con la id "+{id}+" no ha sido encontrado");
    }
    else {return client;}
    
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<void> {
    const client = await this.clientService.findOne(+id);
    if (!client) {
      throw new NotFoundException("El cliente con la id "+{id}+" no ha sido encontrado");
    }
    await this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const client = await this.clientService.findOne(+id);
    if (!client) {
      throw new NotFoundException("El cliente con la id "+{id}+" no ha sido encontrado");
    }
    await this.clientService.remove(+id);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    const client = await this.clientService.findOne(createClientDto.rut);
    if (client) {
      throw new BadRequestException("El cliente ya existe");
    }
    else{
      return this.clientService.create(createClientDto);
    }
  }

  @Post(':id/Create_Account/:type')
  async createAccount(@Param('id') id: number, @Param('type') type: string) {
    const client = await this.clientService.findOneId(id);
    if (!client) {
      throw new NotFoundException('El cliente no se ha encontrado');
    }
    return this.accountService.createAccount(client, type);
  }

  @Get(':id/Get_Accounts')
  async getClientsCards(@Param('id') id: number) {
    return this.accountService.getClientsAccounts(id);
  }

  @Get(':id/exists')
  async checkIfAccountExists(@Param('id') id: number): Promise<boolean> {
    return this.accountService.existsAccount(id);
  }


}