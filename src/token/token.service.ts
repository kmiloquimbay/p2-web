import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    try {
      let tokenValue = 'dcqv-' + Math.random().toString(36).substring(2, 15); // Es dcqv por mis iniciales jaja
      while (await this.tokenRepository.findOneBy({ token: tokenValue })) {
        tokenValue = 'dcqv-' + Math.random().toString(36).substring(2, 15); // Por si se repite aleatoriamente
      }
      
      const token = this.tokenRepository.create({
        ...createTokenDto,
        token: tokenValue
      });
      
      await this.tokenRepository.save(token);
      return token;
    } catch (error) {
      throw new Error('Error creando token: ' + error.message);
    }
  }

  async canUse(id: string) {
    try {
      const token = await this.tokenRepository.findOneBy({ uuid: id });
      if (!token) {
        throw new Error('Token no encontrado');
      }
      if(token.active === true && token.reqLeft > 0){
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Error encontrando token: ' + error.message);
    }
  }
  
  async reduce(id: string, updateTokenDto: UpdateTokenDto) {
    try {
      const token = await this.tokenRepository.findOneBy({ uuid: id.toString() });
      if (!token) {
        throw new Error('Token no encontrado');
      }
      token.reqLeft -= 1;
      await this.tokenRepository.save(token);
      return token;
    }
    catch (error) {
      throw new Error('Error actualizando token: ' + error.message);
    }
    
  }
}
