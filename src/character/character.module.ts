import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { LocationService } from 'src/location/location.service';
import { TokenModule } from 'src/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';

@Module({
  controllers: [CharacterController],
  providers: [LocationService, CharacterService],
  imports: [TypeOrmModule.forFeature([Character, Location]), TokenModule],
})
export class CharacterModule {}
