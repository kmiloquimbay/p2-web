import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CharacterService } from 'src/character/character.service';
import { TokenService } from 'src/token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Token } from 'src/token/entities/token.entity';
import { Location } from './entities/location.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService, CharacterService, TokenService],
  imports: [TypeOrmModule.forFeature([Location, Character, Token])],
})
export class LocationModule {}
