import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { In, Repository } from 'typeorm';
import { Character } from 'src/character/entities/character.entity';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      const { ownerId, ...locationData } = createLocationDto;
      const location = this.locationRepository.create(locationData);
      if (ownerId) {
        const owner = await this.characterRepository.findOneBy({ id: ownerId });
        if (!owner) {
          throw new Error('Owner no encontrado');
        }
        if (owner.property) {
          throw new Error('Owner ya tiene una propiedad');
        }
        location.owner = owner;
      }
      await this.locationRepository.save(location);
      return location;
    } catch (error) {
      throw new Error('Error creando location: ' + error.message);
    }
  }

  async findAll() {
    try {
      // Debe retornar con la relacion de muchos a muchos con Character (favCharacters)
      const locations = await this.locationRepository.find({ relations: ['favCharacters'] });
      return locations;
    } catch (error) {
      throw new Error('Error obteniendo locations: ' + error.message);
    }
  }
}
