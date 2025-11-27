import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CharacterService } from 'src/character/character.service';
import { TokenModule } from 'src/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService, CharacterService],
  imports: [TypeOrmModule.forFeature([Location, Character]), TokenModule],
})
export class LocationModule {}
