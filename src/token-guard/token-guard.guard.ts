import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenGuardGuard implements CanActivate {

  constructor(
     @InjectRepository(Token)
     private readonly tokenRepository: Repository<Token>,
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
    return true;
  }
}
