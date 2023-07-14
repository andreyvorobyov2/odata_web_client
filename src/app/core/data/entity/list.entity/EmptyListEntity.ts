import { IListEntity } from "./IListEntity";
import { IObjectEntity } from "../object.entity/IObjectEntity";


export class EmptyListEntity implements IListEntity {
  list: IObjectEntity[] = [];
  totalRecords: number = 0;
}
