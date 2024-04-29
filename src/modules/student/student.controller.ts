import { Controller, Get, Param, Delete, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from '../../common/guard/auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('api')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    // Rota para criar um estudante
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['student'])
    @Post('student')
    create(@Body() body: any) {
        return this.studentService.create(body);
    }

    // Rota para listar todos os estudantes
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['reviewer'])
    @Get('students')
    findAll() {
        return this.studentService.findAll();
    }

    // Rota para listar um estudante específico
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['reviewer'])
    @Get('student/:id')
    findOne(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    // Rota para atualizar um estudante
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['student'])
    @Patch('student/:id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.studentService.update(id, body);
    }

    // Rota para deletar um estudante
    @Delete('student/:id')
    remove(@Param('id') id: string) {
        return this.studentService.remove(id);
    }
}
