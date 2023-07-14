import { IListEntity } from "../../entity/list.entity/IListEntity";
import { IObjectEntity } from "../../entity/object.entity/IObjectEntity";
import { EmptyListEntity } from "../../entity/list.entity/EmptyListEntity";
import { EmptyObjectFactory } from "../object.factory/EmptyObjectFactory";
import { IListFactory } from "./IListFactory";
import { IObjectFactory } from "../object.factory/IObjectFactory";
import { IListColumns } from "src/app/core/metadata/IMetadata";



export class EmptyListFactory implements IListFactory{
  collectionName: string = ''

  odata_select: string[] = []
  odata_expand: string[] = []

  initializeColumns(listColumns: IListColumns): IListFactory {
    return this
  }
  getObjectFactory(): IObjectFactory {
    return new EmptyObjectFactory()
  }
  createEmptyList(): IListEntity {
    return new EmptyListEntity()
  }
  createFilledInstance(data: any): IObjectEntity | IListEntity {
    const new_list: EmptyListEntity = new EmptyListEntity();
    new_list.list = data;
    return new_list;
  }

}
