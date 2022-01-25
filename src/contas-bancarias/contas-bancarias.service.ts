import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaBancariaRepository } from './contasBancaria.repository';
import { CreateContaDto } from './dtos/create-conta.dto';
import { ContaBancaria } from './contasBancaria.entity';

@Injectable()
export class ContasBancariasService {
    constructor(
        @InjectRepository(ContaBancariaRepository)
        private contaRepository: ContaBancariaRepository,
      ) {}

      async createConta(createContaDto: CreateContaDto): Promise<ContaBancaria> {
        return this.contaRepository.createConta(createContaDto);
      } 

      async findAccountByCPF(cpf: string): Promise<ContaBancaria> {
        const saldo = await this.contaRepository.findOne(cpf, {
          select: ['agencia', 'conta', 'saldo', 'id'],
        });
    
        if (!saldo) throw new NotFoundException('Conta não encontrada');
    
        return saldo;
      }
}
