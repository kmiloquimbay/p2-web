import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { TokenGuardGuard } from 'src/token-guard/token-guard.guard';

@UseGuards(TokenGuardGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Post(':id/favorites/:locationId')
  addFavPlace(@Param('id') id: string, @Param('locationId') locationId: string) {
    return this.characterService.addFavPlace(+id, +locationId);
  }

  @Get(':id/taxes')
  getTaxes(@Param('id') id: string) {
    return this.characterService.getTaxes(+id);
  }
}
