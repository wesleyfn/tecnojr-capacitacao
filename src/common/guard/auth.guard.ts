import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException('Você não está autenticado.');

        const secretKey = this.configService.get('SECRET_KEY');
        const decodedToken = this.jwtService.verify(token, { secret: secretKey });

        request.user = decodedToken;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

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
