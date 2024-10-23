import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class EntityService {
  public create(createEntityDto: CreateEntityDto) {

    console.log(createEntityDto);

    return 'This action adds a new entity';
  }

  // running localhost:8080/entity to test
  public findAll() {
    return null;
  }

  public findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  public update(id: number, updateEntityDto: UpdateEntityDto) {

    console.log(updateEntityDto);

    return `This action updates a #${id} entity`;
  }

  public remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}
