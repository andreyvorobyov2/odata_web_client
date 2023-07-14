import { IObjectFactory } from 'src/app/core/data/factory/object.factory/IObjectFactory';
import { IDataSourceForm } from '../IDataSourceForm';


export interface IObjectForm extends IDataSourceForm {
  factory: IObjectFactory
  isNew():boolean
  save(): void
}
