import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  public constructor(private readonly entityService: EntityService) {}

  @Post()
  public create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Get()
  public findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
