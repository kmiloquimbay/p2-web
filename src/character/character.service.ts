import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const character = this.characterRepository.create(createCharacterDto);
      return await this.characterRepository.save(character);
    } catch (error) {
      throw new Error('Error creando character: ' + error.message);
    }
  }

  async addFavPlace(characterId: number, locationId: number) {
    try {
      const character = await this.characterRepository.findOne({
        where: { id: characterId },
        relations: ['favPlaces'],
      });
      if (!character) {
        throw new Error('Character no encontrado');
      }
      const location = await this.locationRepository.findOneBy({ id: locationId });
      if (!location) {
        throw new Error('Location no encontrada');
      }
      character.favPlaces.push(location);
      return await this.characterRepository.save(character);
    } catch (error) {
      throw new Error('Error agregando lugar favorito: ' + error.message);
    }
  }

  async getTaxes(id: number) {
    try {
      const character = await this.characterRepository.findOne({
        where: { id },
        relations: ['property'], // Agregar relación para obtener la propiedad
      });
      if (!character) {
        throw new Error('Character no encontrado');
      }
      const coef = character.employee? 0.08 : 0.03;
      const costo_location = character.property ? character.property.cost : 0;
      const taxes = costo_location * coef;
      return { taxDebt: taxes };
    } catch (error) {
      throw new Error('Error obteniendo taxes: ' + error.message);
    }
  }
}