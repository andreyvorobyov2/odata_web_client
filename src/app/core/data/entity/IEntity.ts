import { IExternalEntity } from "./IExternalEntity";
import { IMetadata } from "../../metadata/IMetadata";


export interface IEntity {
  ext_entity: IExternalEntity;
  normalizeData(normalized_obj: any, source_obj: any, _md: IMetadata, replace_fk?: boolean): void;
}
