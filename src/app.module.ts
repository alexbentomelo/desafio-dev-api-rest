
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { ContasBancariasModule } from './contas-bancarias/contas-bancarias.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, ContasBancariasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
