
import { EntityRepository, Repository } from 'typeorm';
import { ContaBancaria } from './contasBancaria.entity';
import { CreateContaDto } from './dtos/create-conta.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';


@EntityRepository(ContaBancaria)
export class ContaBancariaRepository extends Repository<ContaBancaria> {

    async createConta(
        createContaDto: CreateContaDto,
      ): Promise<ContaBancaria> {
        const { cpf,agencia,dig_agencia, conta, dig_conta, saldo, status} = createContaDto;
    
        const contaBancaria = this.create();
        contaBancaria.cpf = cpf;
        contaBancaria.agencia = agencia;
        contaBancaria.dig_agencia = dig_agencia;
        contaBancaria.conta = conta;
        contaBancaria.dig_conta = dig_conta;
        contaBancaria.saldo = saldo;
        contaBancaria.status = status;
        try {
          await contaBancaria.save();
          return contaBancaria;
        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('Conta já existe');
          } else {
            throw new InternalServerErrorException(
              'Erro ao salvar o usuário no banco de dados',
            );
          }
        }
      }
    

}