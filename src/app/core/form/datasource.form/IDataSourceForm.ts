import { IForm } from "../IForm";
import { IListEntity } from "../../data/entity/list.entity/IListEntity";
import { IObjectEntity } from "../../data/entity/object.entity/IObjectEntity";
import { IMetadata } from "../../metadata/IMetadata";


export interface IDataSourceForm extends IForm {
  dataSource: IListEntity | IObjectEntity
  refresh(): void
  get_fetched_data(obj: any, prop: string, obj_md:IMetadata): string
}
