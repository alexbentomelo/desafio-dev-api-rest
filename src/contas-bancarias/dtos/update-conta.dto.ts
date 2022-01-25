import { ContaStatus } from '../dtos/sonta-status.enum';
import { IsOptional } from 'class-validator';

export class UpdateContaDto {
  cpf: string;

  @IsOptional()
  status: ContaStatus;
}