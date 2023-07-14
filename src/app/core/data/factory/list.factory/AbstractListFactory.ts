
import { IListFactory } from "./IListFactory"
import { IObjectFactory } from "../object.factory/IObjectFactory"
import { Utils } from "../../../utils"
import { IListEntity } from "../../entity/list.entity/IListEntity"
import { IObjectEntity } from "../../entity/object.entity/IObjectEntity"
import { IListColumns } from "src/app/core/metadata/IMetadata"


export abstract class AbstractListFactory implements IListFactory{

  odata_select:string[]=[]
  odata_expand:string[]=[]


  abstract collectionName: string

  abstract createEmptyList():IListEntity
  abstract getObjectFactory(): IObjectFactory

  initializeColumns(listColumns: IListColumns): IListFactory {

    if(listColumns.columns === undefined){
      return this
    }

    for(let column of listColumns.columns){

      let _data_path = column.dataPath
      let segments = _data_path.split('.')
      if(segments.length > 2){
        throw new Error('Not supported data path more than 2 segments')
      }

      // segment 0
      let s1:string = segments[0]
      let fk = listColumns.md.foreign_keys.get(s1)
      if(fk === undefined && segments.length === 2){
        throw new Error('First segment of data path must be foreign field')
      }

      // segment 1
      let s2:string = ''
      if(segments.length === 2){
        s2 = segments[1]
      }

      if(fk != undefined){ // is foreign key
        let fk_presentation =  (s2 != '') ? s2 : fk.md.presentation
        Utils.arr_add_unique(this.odata_expand, s1)
        Utils.arr_add_unique(this.odata_select, s1 + '/' + fk_presentation)
      }else{ // is inner field, not fk
        Utils.arr_add_unique(this.odata_select, s1)
      }
    }

    return this
  }

  createFilledInstance(data: any): IListEntity {
    let new_dataList:IListEntity = this.createEmptyList()

    for(let remote_obj of data[this.collectionName]){
      let new_obj:IObjectEntity =  <IObjectEntity> this.getObjectFactory().createFilledInstance(remote_obj)
      new_dataList.list.push(new_obj)
    }

    // total record in database
    new_dataList.totalRecords = data.total

    return new_dataList
  }
}
