import { IListEntity } from "../entity/list.entity/IListEntity";
import { IObjectEntity } from "../entity/object.entity/IObjectEntity";


export interface IFactory {
  odata_select: string[];
  odata_expand: string[];
  createFilledInstance(data: any): IObjectEntity | IListEntity;
}
