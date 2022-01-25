import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto
  ): Promise<User> {
    const { cpf, name } = createUserDto;

    const user = this.create();
    user.cpf = cpf;
    user.name = name;
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('cpf já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

}