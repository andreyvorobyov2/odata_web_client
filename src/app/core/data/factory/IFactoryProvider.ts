import { IObjectFactory } from './object.factory/IObjectFactory';
import { IListFactory } from './list.factory/IListFactory';


export interface IFactoryProvider {
  getObjectFactory(): IObjectFactory;
  getListFactory(): IListFactory;
}
