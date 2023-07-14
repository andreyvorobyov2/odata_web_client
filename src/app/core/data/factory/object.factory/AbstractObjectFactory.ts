
import { IRequestBuilder } from "../../request.builder/IRequestBuilder";
import { IEntity } from "../../entity/IEntity";
import { IObjectFactory } from "./IObjectFactory";
import { IObjectEntity } from "../../entity/object.entity/IObjectEntity";
import { IObjectFields } from "src/app/core/metadata/IMetadata";
import { IExternalData } from "../../IExternalData";


export abstract class AbstractObjectFactory implements IObjectFactory{

  abstract createEmptyObject(): IObjectEntity

  odata_select:string[] = []
  odata_expand:string[] = []


  private pk:string = ''

  receiver: IEntity | undefined;
  receiverDataPath: string | undefined;

  tabularSections:[string, IObjectFactory, IRequestBuilder][]=[]

  initializeFields(attr: IObjectFields): IObjectFactory {
    this.pk = attr.md.primary_key

    // Ref_Key
    if(this.pk != '')
      this.odata_select.push(this.pk)

    if(attr.fields != undefined){
      this.odata_select.push(...attr.fields)
    }

    if(attr.foreignFields != undefined){
      attr.foreignFields.forEach(f=>{
        this.odata_expand.push(f.property_name)

        this.odata_select.push(f.property_name +'/'+ f.md.primary_key)
        this.odata_select.push(f.property_name +'/'+ f.md.presentation)

      })
    }

    if(attr.tabularSections != undefined){
      for(let t of attr.tabularSections){

        const factory:IObjectFactory = t.table_md.factoryProvider.getObjectFactory()
        factory.initializeFields({ md:t.table_md, fields:t.columns, foreignFields:t.foreignColumns })

        const requestBuilder:IRequestBuilder = t.table_md.requestBuilderProvider.getRequestBuilder()
        requestBuilder.odata_select(factory.odata_select)
        requestBuilder.odata_expand(factory.odata_expand)

        this.tabularSections.push([t.name, factory, requestBuilder])

      }
    }

    return this
  }

  createFilledInstance(data: any): IObjectEntity {
    let obj:IObjectEntity = this.createEmptyObject()

    if(this.receiver === undefined){ // is not tabular section
      type objkeys = keyof typeof obj.data

      let pk_value:string = ''

      let _data = data.hasOwnProperty('value') && Array.isArray(data.value)? data.value[0] : data

      Object.keys(_data).forEach(key=> {
        if(key === this.pk)
          pk_value = _data[key]
        obj.data[key as objkeys] = _data[key]
      })

      for(let t of this.tabularSections){
        const factory:IObjectFactory = t[1]
        factory.receiver = obj.data
        factory.receiverDataPath = t[0]

        const requestBuilder:IRequestBuilder = t[2]
        requestBuilder.getEntity(pk_value)

        const ext:IExternalData = {factory:factory, requestBuilder:requestBuilder}
        obj.data.ext_entity.extData.push(ext)
      }

    }else{ // is tabular section
      let rows:IEntity[] = []
      for(let row of data.value){
        let obj:IObjectEntity = this.createEmptyObject()
        type objkeys = keyof typeof obj.data
        Object.keys(row).forEach(key=> obj.data[key as objkeys] = row[key])
        rows.push(obj.data)
      }
      // @ts-ignore
      this.receiver[this.receiverDataPath] = rows
    }

    return obj
  }
}
