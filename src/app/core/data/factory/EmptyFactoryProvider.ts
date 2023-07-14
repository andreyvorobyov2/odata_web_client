import { IFactoryProvider } from "./IFactoryProvider";
import { IListFactory } from "./list.factory/IListFactory";
import { IObjectFactory } from "./object.factory/IObjectFactory";
import { EmptyObjectFactory } from "./object.factory/EmptyObjectFactory";
import { EmptyListFactory } from "./list.factory/EmptyListFactory";


export class EmptyFactoryProvider implements IFactoryProvider {
  getObjectFactory(): IObjectFactory {
    return new EmptyObjectFactory();
  }
  getListFactory(): IListFactory {
    return new EmptyListFactory();
  }
}
