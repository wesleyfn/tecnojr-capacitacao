import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

  ) { }

  async create(createAdminDto: CreateAdminDto) {
    await this.emailExists(createAdminDto.email);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createAdminDto.password, salt);

    createAdminDto.password = passwordHash;

    const admin = await this.adminRepository.save(createAdminDto);
    delete admin.password;

    return admin;
  }

  async findAll() {
    return await this.adminRepository.find()
  }

  async findOne(id: string) {
    try {
      return await this.adminRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (updateAdminDto.email && admin.email !== updateAdminDto.email) {
      await this.emailExists(updateAdminDto.email);
    }

    updateAdminDto.password = await this.cryptPassword(updateAdminDto.password);
    await this.adminRepository.update(id, updateAdminDto);

    return { message: `O usuário foi atualizado com sucesso.` };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.adminRepository.delete(id);

    return { message: `O usuário foi removido com sucesso.` };
  }


  async findOneByEmail(email: string) {
    return await this.adminRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    });
  }

  private async emailExists(email: string) {
    if (await this.adminRepository.findOne({ where: { email } })) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }

  private async cryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

}
