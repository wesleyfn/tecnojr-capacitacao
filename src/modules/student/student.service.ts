import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) { }

  async create(createStudentDto: CreateStudentDto)
  {
    await this.alreadyExists(createStudentDto.id, createStudentDto.email);

    createStudentDto.password = await this.cryptPassword(createStudentDto.password);

    const student = await this.studentRepository.save(createStudentDto);
    delete student.password;

    return student;
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.studentRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Aluno não encontrado.');
    }
  }

  async findOneByEmail(email: string) {
    return await this.studentRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.findOne(id);

    if (updateStudentDto.email) 
      await this.emailExists(updateStudentDto.email);
    
    if (updateStudentDto.password)
      updateStudentDto.password = await this.cryptPassword(updateStudentDto.password);

    await this.studentRepository.update(id, updateStudentDto);
    return { message: `Aluno foi atualizado com sucesso.` };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.studentRepository.delete(id);
    return { message: `Aluno foi removido com sucesso.` };
  }


  async alreadyExists(id: string, email: string) {
    if (await this.studentRepository.findOne({ where: { id } })) {
      throw new BadRequestException('Matricula já cadastrada.');
    }
    await this.emailExists(email);
  }

  async emailExists(email: string) {
    if (await this.studentRepository.findOne({ where: { email } })) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }

  // Método para criptografar a senha
  private async cryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
