import { Utils } from '../../utils';
import { IEntity } from './IEntity';
import { IExternalEntity } from "./IExternalEntity";
import { IForeignField, IMetadata, ITabularSection } from "../../metadata/IMetadata";


export abstract class AbstractEntity implements IEntity {
  ext_entity: IExternalEntity = { extData: [], extProperties: [] };

  normalizeData(normalized_obj: any, source_obj: any, _md: IMetadata, replace_fk?: boolean) {
    const keys = Object.keys(source_obj);

    for (let key of keys) {
      if (key === 'ext_entity' || key === 'md')
        continue; // service keys

      let ts: ITabularSection | undefined = _md.tabular_sections.find(i => i.name === key);

      if (ts != undefined && Array.isArray(source_obj[key])) { // is tabular section
        let nts = [];
        for (let row of source_obj[key]) {
          let nrow: any = {};
          this.normalizeData(nrow, row, ts.table_md, replace_fk);
          nts.push(nrow);
        }
        normalized_obj[key] = nts;
        continue;
      }

      let fk: IForeignField | undefined = _md.foreign_keys.get(key);
      if (fk != undefined && replace_fk === true) { // is foreigen field

        let value = source_obj[key];
        normalized_obj[fk.property_name + '_Key'] = Utils.propertyIsFilled(value, fk.md.primary_key) ? value[fk.md.primary_key] : null;

      } else {
        normalized_obj[key] = source_obj[key];
      }
    }
  }

}
