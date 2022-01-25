import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaBancariaRepository } from './contasBancaria.repository';
import { CreateContaDto } from './dtos/create-conta.dto';
import { ContaBancaria } from './contasBancaria.entity';
import { UpdateContaDto } from './dtos/update-conta.dto';

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
          select: ['agencia', 'conta', 'saldo','status', 'id'],
        });
    
        if (!saldo) throw new NotFoundException('Conta não encontrada');
    
        return saldo;
      }

      async updateUser(updateUserDto: UpdateContaDto, cpf: string): Promise<ContaBancaria> {
        const conta = await this.findAccountByCPF(cpf);
        const { status } = updateUserDto;
        conta.status = status === undefined ? conta.status : status;
        try {
          await conta.save();
          return conta;
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao salvar os dados no banco de dados',
          );
        }
      }
}
