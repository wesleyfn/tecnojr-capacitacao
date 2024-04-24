import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);

    // Se não houver roles, significa que qualquer usuário pode acessar a rota
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica se o usuário tem a role necessária para acessar a rota
    if (roles.includes(user.role))
      return true;
    else
      throw new UnauthorizedException('Você não tem permissão.');
  }
}