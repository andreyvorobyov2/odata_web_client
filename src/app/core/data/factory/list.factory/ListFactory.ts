
import { AbstractListFactory } from "src/app/core/data/factory/list.factory/AbstractListFactory";
import { IObjectFactory } from "src/app/core/data/factory/object.factory/IObjectFactory";
import { Activator } from "../../../Activator";
import { ObjectFactory } from "../object.factory/ObjectFactory";
import { IListEntity } from "../../entity/list.entity/IListEntity";


export class ListFactory extends AbstractListFactory {
  override collectionName: string = 'value';

  constructor(private objectClass: any, private listClass: any) { super(); }

  override createEmptyList(): IListEntity {
    if (this.listClass === undefined)
      throw Error('list class is undefined');
    return Activator.create(this.listClass);
  }

  override getObjectFactory(): IObjectFactory {
    return new ObjectFactory(this.objectClass);
  }
}
