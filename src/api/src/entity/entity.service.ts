import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntityService {
  public create(createEntityDto: CreateEntityDto) {

    console.log(createEntityDto);

    return 'This action adds a new entity';
  }

  public debugTest = () => {
    debugger;
  }

  // running localhost:8080/entity to test
  public findAll() {
    return this.debugTest();
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
