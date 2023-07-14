import { IListFactory } from 'src/app/core/data/factory/list.factory/IListFactory';
import { IDataSourceForm } from '../IDataSourceForm';


export interface IListForm extends IDataSourceForm {
  factory: IListFactory
  pageSize: number
  pageIndex: number
  select(): void
  create(): void
}
