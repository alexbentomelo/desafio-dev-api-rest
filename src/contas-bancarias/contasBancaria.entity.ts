import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  @Unique(['cpf'])
  export class ContaBancaria extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 11 })
    cpf: string;
  
    @Column({ nullable: false })
    saldo: number;
  
    @Column({ nullable: false})
    agencia: number;

    @Column({ nullable: false })
    dig_agencia: number;
  
    @Column({ nullable: false })
    conta: number;

    @Column({ nullable: false })
    dig_conta: number;

    @Column({ nullable: false, type: 'varchar', length: 10 })
    status: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }