import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('api')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) { }

  // Rota para criar um revisor
  @Post('reviewer')
  async create(@Body() createReviewerDto: CreateReviewerDto) {
    return this.reviewerService.create(createReviewerDto);
  }

  // Rota para listar todos os revisores
  @Get('reviewers')
  async findAll() {
    return this.reviewerService.findAll();
  }
  
  // Rota para listar um revisor específico
  @Get('reviewer/:id')
  async findOne(@Param('id') id: string) {
    return this.reviewerService.findOne(id);
  }

  // Rota para atualizar um revisor
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer'])
  @Patch('reviewer/:id')
  async update(@Param('id') id: string, @Body() updateReviewerDto: UpdateReviewerDto) {
    return this.reviewerService.update(id, updateReviewerDto);
  }

  // Rota para deletar um revisor
  @Delete('reviewer/:id')
  async remove(@Param('id') id: string) {
    return this.reviewerService.remove(id);
  }
}
