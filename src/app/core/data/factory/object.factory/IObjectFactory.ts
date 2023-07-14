import { IFactory } from '../IFactory';
import { IEntity } from '../../entity/IEntity';
import { IObjectEntity } from '../../entity/object.entity/IObjectEntity';
import { IObjectFields } from 'src/app/core/metadata/IMetadata';


export interface IObjectFactory extends IFactory {
  receiver: IEntity | undefined;
  receiverDataPath: string | undefined;
  initializeFields(objectFields: IObjectFields): IObjectFactory;

  createEmptyObject(): IObjectEntity;
}
