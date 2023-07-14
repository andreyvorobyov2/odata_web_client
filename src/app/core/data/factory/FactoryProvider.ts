import { IFactoryProvider } from "src/app/core/data/factory/IFactoryProvider";
import { IListFactory } from "src/app/core/data/factory/list.factory/IListFactory";
import { IObjectFactory } from "src/app/core/data/factory/object.factory/IObjectFactory";
import { ListFactory } from "./list.factory/ListFactory";
import { ObjectFactory } from "./object.factory/ObjectFactory";


export class FactoryProvider implements IFactoryProvider {

  constructor(public entityObjectClass: any, private entityListClass: any) { }

  getObjectFactory(): IObjectFactory {
    return new ObjectFactory(this.entityObjectClass);
  }

  getListFactory(): IListFactory {
    return new ListFactory(this.entityObjectClass, this.entityListClass);
  }
}
