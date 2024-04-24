import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { KeyValidationMiddleware } from '../../common/middleware/key-validation.middleware';

@Controller('api')
@UseInterceptors(KeyValidationMiddleware)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) { }

  @Post('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('admins')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
