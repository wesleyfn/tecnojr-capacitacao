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

  @Post('reviewer')
  async create(@Body() createReviewerDto: CreateReviewerDto) {
    return this.reviewerService.create(createReviewerDto);
  }

  @Get('reviewers')
  async findAll() {
    return this.reviewerService.findAll();
  }
  
  @Get('reviewer/:id')
  async findOne(@Param('id') id: string) {
    return this.reviewerService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['reviewer'])
  @Patch('reviewer/:id')
  async update(@Param('id') id: string, @Body() updateReviewerDto: UpdateReviewerDto) {
    return this.reviewerService.update(id, updateReviewerDto);
  }

  @Delete('reviewer/:id')
  async remove(@Param('id') id: string) {
    return this.reviewerService.remove(id);
  }
}
