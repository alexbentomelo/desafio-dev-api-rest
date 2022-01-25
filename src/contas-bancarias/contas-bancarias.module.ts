import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaBancariaRepository } from './contasBancaria.repository';
import { ContasBancariasService } from './contas-bancarias.service';
import { ContasBancariasController } from './contas-bancarias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContaBancariaRepository])],
  providers: [ContasBancariasService],
  controllers: [ContasBancariasController],
})
export class ContasBancariasModule {}
