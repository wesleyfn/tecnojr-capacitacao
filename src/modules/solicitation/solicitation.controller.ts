import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto, UpdateSolicitationStatusDto } from './dto/update-solicitation.dto';
import { AuthGuard, RolesGuard } from '../../common/guard/auth.guard';
import { Roles } from '../../common/decorator/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('api')
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['student'])
  @Post('solicitation')
  async create(@Body() createSolicitationDto: CreateSolicitationDto, @Req() request: any) {
    return await this.solicitationService.create(createSolicitationDto, request);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer'])
  @Get('solicitations')
  async findAll() {
    return await this.solicitationService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer'])
  @Get('solicitation/:studentId')
  async findByStudent(@Param('studentId') id: string) {
    return await this.solicitationService.findByStudent(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['student'])
  @Patch('solicitation/:studentId')
  async updateByStudent(@Param('studentId') id: string, @Body() updateSolicitationDto: UpdateSolicitationDto) {
    return await this.solicitationService.updateByStudent(id, updateSolicitationDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer'])
  @Patch('solicitation/status/:studentId')
  async updateStatus(@Param('studentId') id: string, @Body() updateSolicitationStatusDto: UpdateSolicitationStatusDto) {
    return await this.solicitationService.updateStatus(id, updateSolicitationStatusDto);
  }

  @Delete('solicitation/:id')
  async remove(@Param('id') id: number) {
    return await this.solicitationService.remove(+id);
  }
}
