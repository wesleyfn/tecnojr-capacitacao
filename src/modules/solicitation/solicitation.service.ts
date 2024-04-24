import { Injectable } from '@nestjs/common';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto, UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitation } from './entities/solicitation.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class SolicitationService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    private jwtService: JwtService
  ) { }

  async create(createSolicitationDto: CreateSolicitationDto, request: Request) {
    const payload = this.jwtService.decode(this.extractTokenFromHeader(request));
    const studentId = payload.sub;

    const solicitation = await this.solicitationRepository.findOne({ where: { studentId: studentId } });
    if (solicitation) {
      throw new Error('Você já possui uma solicitação.');
    }

    const newSolicitationDto = {
      ...createSolicitationDto,
      studentId: studentId,
    };

    return await this.solicitationRepository.save(newSolicitationDto);
  }

  async findAll() {
    return await this.solicitationRepository.find();
  }

  async findByStudent(studentId: string) {
    try {
      return await this.solicitationRepository.findOneByOrFail({ studentId });
    }
    catch (error) {
      throw new NotFoundException('Solicitação não encontrada.');
    }
  }

  async updateByStudent(studentId: string, updateSolicitationDto: UpdateSolicitationDto) {
    const solicitation = await this.findByStudent(studentId);

    await this.solicitationRepository.update(solicitation.id, updateSolicitationDto);
    return { message: `A solicitação foi atualizada com sucesso.` };
  }

  async updateStatus(studentId: string, updateSolicitationStatusDto: UpdateSolicitationStatusDto) {
    const solicitation = await this.findByStudent(studentId);

    let newSolicitation = solicitation;
    newSolicitation.status = updateSolicitationStatusDto.status;

    await this.solicitationRepository.update(solicitation.id, newSolicitation);
    return { message: `O status da solicitação foi atualizado com sucesso.` };
  }

  async updateAllStatus(updateSolicitationStatusDto: UpdateSolicitationStatusDto) {
    await this.solicitationRepository.update({}, updateSolicitationStatusDto);
    return { message: `O status de todas as solicitações foi atualizado com sucesso.` };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.solicitationRepository.delete(id);
    return { message: `A solicitação foi removida com sucesso.` };
  }


  private async findOne(id: number) {
    try {
      return await this.solicitationRepository.findOneByOrFail({ id });
    }
    catch (error) {
      throw new NotFoundException('Solicitação não encontrada.');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
