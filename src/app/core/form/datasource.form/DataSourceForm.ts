import { AfterViewInit, Directive, OnInit, inject } from "@angular/core"
import { Form, LoadingStatus } from "../Form"
import { DataSourceHttpService } from "../../data/DataSourceHttpService"
import { Utils } from "../../utils"
import { IDataSourceForm } from "./IDataSourceForm"
import { IForeignField, IMetadata } from "../../metadata/IMetadata"


@Directive({})
export abstract class DataSourceForm extends Form implements IDataSourceForm, OnInit, AfterViewInit{

  dataSource: any

  override onCreateForm(): void {
    this.dataSource = this.md.factoryProvider.getObjectFactory().createEmptyObject()
  }

  protected data_is_fetched:boolean = false
  protected onDataFetched():void{
    this.loading = false
    this.formEventNotify.next({owner: this, params: LoadingStatus.COMPLETE})
    this.data_is_fetched = true
  }

  public abstract refresh():void

  protected dataService:DataSourceHttpService = inject(DataSourceHttpService)

  protected requestId:string = ''

  ngOnInit(): void {
    this.requestId = Utils.makeid(5)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.refresh()
    }, 0)
  }

  get_fetched_data(obj:any, prop:string, obj_md:IMetadata):string{
    if(! this.data_is_fetched)
      return ''
    return this.fetch_data(obj, prop, obj_md)
  }

  private fetch_data(obj:any, prop:string, obj_md:IMetadata):string {

    if(obj === undefined || obj === null)
      return ''

    let segments = prop.split('.')
    if(segments.length > 2){
      throw new Error('Not supported data path more than 2 segments')
    }

    let s1 = segments[0]
    let fk:IForeignField|undefined = obj_md.foreign_keys.get(s1)

    if(fk === undefined && segments.length === 2){
      throw new Error('First segment of data path must be foreign field')
    }

    if(fk != undefined){
      let fk_presentation = segments.length === 1 ? fk.md.presentation : segments[1]
      return this.get_from_object(obj, s1, fk_presentation)
    }
    return this.get_from_object(obj, s1)
  }

  private get_from_object(obj:any, s1:string, s2:string|undefined = undefined):string{
    let r1 = obj[s1]
    if(r1 === undefined || r1 === null) return ''
    if(s2 === undefined) return r1
    let r2 = r1[s2]
    if(r2 === undefined || r2===null) return ''
    return r2
  }
}

