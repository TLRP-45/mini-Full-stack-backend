import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './services/typeorm/typeorm.service';
import { AccountModule } from './account/account.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AccountModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
