import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ContaBancariaRepository } from './contasBancaria.repository';
import { CreateContaDto } from './dtos/create-conta.dto';
import { ContaBancaria } from './contasBancaria.entity';
import { ContasBancariasService } from './contas-bancarias.service';
import { ReturnContaDto } from './dtos/return-conta.dto';

@Controller('contas-bancarias')
export class ContasBancariasController {

  constructor(private contaService: ContasBancariasService) {}

  @Post()
  async createAdminUser(
    @Body() createContaDto: CreateContaDto,
  ): Promise<ReturnContaDto> {
    const conta = await this.contaService.createConta(createContaDto);
    return {
      conta,
      message: 'Conta criada com sucesso',
    };
  }

  @Get(':cpf')
  async findUserById(@Param('cpf') cpf): Promise<ReturnContaDto> {
    const conta = await this.contaService.findAccountByCPF(cpf);
    return {
      conta,
      message: 'Saldo da Conta',
    };
  }
}
