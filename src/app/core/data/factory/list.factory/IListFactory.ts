import { IFactory } from '../IFactory';
import { IObjectFactory } from '../object.factory/IObjectFactory';
import { IListEntity } from '../../entity/list.entity/IListEntity';
import { IListColumns } from 'src/app/core/metadata/IMetadata';


export interface IListFactory extends IFactory {
  collectionName: string;
  initializeColumns(listColumns: IListColumns): IListFactory;

  getObjectFactory(): IObjectFactory
  createEmptyList(): IListEntity
}
