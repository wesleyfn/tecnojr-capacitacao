import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto, UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';

@Controller('api')
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) { }

  // Rota para criar uma solicitação
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['student'])
  @Post('solicitation')
  async create(@Body() createSolicitationDto: CreateSolicitationDto, @Req() request: any) {
    return await this.solicitationService.create(createSolicitationDto, request);
  }

  // Rota para listar todas as solicitações
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer', 'admin'])
  @Get('solicitations')
  async findAll() {
    return await this.solicitationService.findAll();
  }

  // Rota para listar uma solicitação específica
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer', 'admin'])
  @Get('student/:studentId/solicitation')
  async findByStudent(@Param('studentId') id: string) {
    return await this.solicitationService.findByStudent(id);
  }

  // Rota para atualizar uma solicitação
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['student', 'admin'])
  @Patch('student/:studentId/solicitation')
  async updateByStudent(@Param('studentId') id: string, @Body() updateSolicitationDto: UpdateSolicitationDto) {
    return await this.solicitationService.updateByStudent(id, updateSolicitationDto);
  }

  // Rota para atualizar o status de uma solicitação
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer', 'admin'])
  @Patch('student/:studentId/solicitation/status')
  async updateStatus(@Param('studentId') id: string, @Body() updateSolicitationStatusDto: UpdateSolicitationStatusDto) {
    return await this.solicitationService.updateStatus(id, updateSolicitationStatusDto);
  }

  // Rota para atualizar o status de todas as solicitações
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer', 'admin'])
  @Put('solicitations/status')
  async updateAllStatus(@Body() updateSolicitationStatusDto: UpdateSolicitationStatusDto) {
    return await this.solicitationService.updateAllStatus(updateSolicitationStatusDto);
  }

  // Rota para deletar uma solicitação
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @Delete('solicitation/:id')
  async remove(@Param('id') id: number) {
    return await this.solicitationService.remove(+id);
  }
}
