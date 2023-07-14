
import { IObjectEntity } from "../../entity/object.entity/IObjectEntity";
import { IEntity } from "../../entity/IEntity";
import { IObjectFactory } from "./IObjectFactory";
import { EmptyObjectEntity } from "../../entity/object.entity/EmptyObjectEntity";
import { IObjectFields } from "src/app/core/metadata/IMetadata";


export class EmptyObjectFactory implements IObjectFactory {

  odata_select: string[] = [];
  odata_expand: string[] = [];

  receiver: IEntity | undefined = undefined;
  receiverDataPath: string | undefined = undefined;

  initializeFields(objectFields: IObjectFields): IObjectFactory {
    return this;
  }

  createFilledInstance(data: any, ext_obj?: IObjectEntity | undefined): IObjectEntity {
    const new_obj: EmptyObjectEntity = new EmptyObjectEntity();
    type keys = keyof typeof new_obj.data
    new_obj.data['totalRecords' as keys] = data;
    return new_obj;
  }

  createEmptyObject(): IObjectEntity {
    return new EmptyObjectEntity;
  }
}
