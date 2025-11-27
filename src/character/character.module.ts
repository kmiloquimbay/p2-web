import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { LocationService } from 'src/location/location.service';
import { TokenService } from 'src/token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Token } from 'src/token/entities/token.entity';
import { Location } from 'src/location/entities/location.entity';

@Module({
  controllers: [CharacterController],
  providers: [LocationService, CharacterService, TokenService],
  imports: [TypeOrmModule.forFeature([Character, Location, Token])],
})
export class CharacterModule {}
