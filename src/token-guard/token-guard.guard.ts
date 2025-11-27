import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';
import { Repository } from 'typeorm';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TokenGuardGuard implements CanActivate {

  constructor(
     @InjectRepository(Token)
     private readonly tokenRepository: Repository<Token>,
     private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenValue = request.headers['x-api-key'];
    if (!tokenValue) {
      return false;
    }
    const token = await this.tokenRepository.findOneBy({ token: tokenValue });
    if (!token) {
      return false;
    }
    if (token.active === false || token.reqLeft <= 0) {
      return false;
    }
    
    // Reducir el token usando el método reduce del TokenService
    try {
      await this.tokenService.reduce(token.uuid, {});
      // Agregar el token UUID al request para uso posterior si es necesario
      request.tokenId = token.uuid;
    } catch (error) {
      // Si hay error al reducir, no permitir el acceso
      return false;
    }
    
    return true;
  }
}
