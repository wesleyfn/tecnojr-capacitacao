import { Injectable } from '@nestjs/common';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviewer } from './entities/reviewer.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class ReviewerService {
  constructor(
    @InjectRepository(Reviewer)
    private reviewerRepository: Repository<Reviewer>,
  ) { }


  async create(createReviewerDto: CreateReviewerDto) {
    await this.emailExists(createReviewerDto.email);

    createReviewerDto.password = await this.cryptPassword(createReviewerDto.password);

    const reviewer = await this.reviewerRepository.save(createReviewerDto);
    delete reviewer.password;

    return reviewer;
  }

  async findAll() {
    return await this.reviewerRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.reviewerRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  async update(id: string, updateReviewerDto: UpdateReviewerDto) {
    await this.findOne(id);

    if (updateReviewerDto.email) {
      await this.emailExists(updateReviewerDto.email);
    }

    if (updateReviewerDto.password) {
      updateReviewerDto.password = await this.cryptPassword(updateReviewerDto.password);
    }

    await this.reviewerRepository.update(id, updateReviewerDto);
    return { message: `O usuário foi atualizado com sucesso.` };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.reviewerRepository.delete(id);

    return { message: `O usuário foi removido com sucesso.` };
  }


  // Método para buscar um usuário pelo email
  async findOneByEmail(email: string) {
    return await this.reviewerRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  // Método para verificar se o email já existe
  private async emailExists(email: string) {
    const reviewer = await this.reviewerRepository.findOne({ where: {email} });

    if (reviewer) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }

  // Método para criptografar a senha
  private async cryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
