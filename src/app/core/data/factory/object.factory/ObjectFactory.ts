
import { AbstractObjectFactory } from "src/app/core/data/factory/object.factory/AbstractObjectFactory";
import { Activator } from "../../../Activator";
import { IObjectEntity } from "../../entity/object.entity/IObjectEntity";


export class ObjectFactory extends AbstractObjectFactory {

  constructor(private objectClass: any) { super() }

  override createEmptyObject(): IObjectEntity {
    if (this.objectClass === undefined)
      throw Error('object class is undefined');
    return Activator.create(this.objectClass);
  }
}
