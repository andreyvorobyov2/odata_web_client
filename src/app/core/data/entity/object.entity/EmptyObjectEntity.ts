import { IObjectEntity } from "./IObjectEntity";
import { EmptyEntity } from "../EmptyEntity";


export class EmptyObjectEntity implements IObjectEntity {
  data: EmptyEntity = new EmptyEntity();
}
