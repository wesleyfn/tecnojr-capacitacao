import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('api')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) { }

  // Rota para criar um administrador
  @Post('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // Rota para listar todos os administradores
  @Get('admins')
  findAll() {
    return this.adminService.findAll();
  }

  // Rota para listar um administrador específico
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  // Rota para atualizar um administrador
  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  // Rota para deletar um administrador
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
