import { Directive, OnDestroy, OnInit } from "@angular/core";
import { LoadingStatus } from "../../Form";
import { DataSourceForm } from "../DataSourceForm";
import { Subscription } from "rxjs";
import { IObjectForm } from "./IObjectForm";
import { Utils } from "../../../utils";
import { IRequestResult } from "src/app/core/data/IRequestResult";
import { IObjectFactory } from "src/app/core/data/factory/object.factory/IObjectFactory";
import { IEntity } from "src/app/core/data/entity/IEntity";
import { IRequestBuilder } from "src/app/core/data/request.builder/IRequestBuilder";
import { IForeignField, IObjectFields } from "src/app/core/metadata/IMetadata";


@Directive({})
export abstract class AbstractObjectForm extends DataSourceForm implements IObjectForm, OnInit, OnDestroy{

  // @ts-ignore
  factory:IObjectFactory

  override onCreateForm(): void {
    super.onCreateForm()

    let _fields:string[] = []
    let _foreignFields:IForeignField[] = []

    for(let a of this.md.attributes){
      if(a.foreignField != undefined){
         _foreignFields.push(a.foreignField)
      }else{
        _fields.push(a.dataPath)
      }
    }

    const _object_fields:IObjectFields = {
      md: this.md,
      fields: _fields,
      foreignFields: _foreignFields,
      tabularSections: this.md.tabular_sections
    }

    this.factory = this.md.factoryProvider.getObjectFactory().initializeFields(_object_fields)
  }

  private httpGETCompleteSubs:Subscription = new Subscription()
  private httpPATCHCompleteSubs:Subscription = new Subscription()
  private httpPOSTCompleteSubs:Subscription = new Subscription()
  private httpErrorSubs:Subscription = new Subscription()

  override ngOnInit(): void {
    super.ngOnInit()
    this.httpGETCompleteSubs = this.dataService.onHttpRequestGETComplete.subscribe(requestResult=>{
      this.update_datasource(requestResult)
    })

    this.httpPATCHCompleteSubs = this.dataService.onHttpRequestPATCHComplete.subscribe(requestResult=>{
      if(requestResult.requestId === this.requestId){
        this.refresh()
      }
    })

    this.httpPOSTCompleteSubs = this.dataService.onHttpRequestPOSTComplete.subscribe(requestResult=>{
      if(requestResult.requestId === this.requestId){
        const key:string = Utils.getProperty(requestResult.fetchedData, this.md.primary_key, undefined)
        if(Utils.valueIsFilled(key)){
          this.params.key = key
          this.refresh()
        }
      }
    })

    this.httpErrorSubs = this.dataService.onHttpRequestError.subscribe(requestError=>{
      if(requestError.requestId === this.requestId){
        this.loading = false
        this.formEventNotify.next({owner:this, params: LoadingStatus.COMPLETE})
      }
    })

  }

  ngOnDestroy(): void {
    this.httpGETCompleteSubs.unsubscribe()
    this.httpPATCHCompleteSubs.unsubscribe()
    this.httpPOSTCompleteSubs.unsubscribe()
    this.httpErrorSubs.unsubscribe()
  }

  private update_datasource(requestResult:IRequestResult){
    if(requestResult.requestId === this.requestId){
      this.dataSource.data = requestResult.fetchedData.data
      this.onDataFetched()
    }
  }

  // save/create object
  save(): void {

    this.formEventNotify.next({owner:this, params: LoadingStatus.START})
    this.loading = true

    const entity:IEntity = (<IEntity>this.dataSource.data)
    const normalized_obj:any = {}
    entity.normalizeData(normalized_obj, this.dataSource.data, this.md,  true)
    const requestBuilder:IRequestBuilder = this.md.requestBuilderProvider.getRequestBuilder()

    if(Utils.propertyIsFilled(this.params,'key')){
      requestBuilder.getEntity(this.params.key)
      this.dataService.httpRequestPATCH(normalized_obj, requestBuilder, this.factory, this.requestId)
    }else{
      this.dataService.httpRequestPOST(normalized_obj, requestBuilder, this.factory, this.requestId)
    }
  }

  isNew(): boolean {
    return ! Utils.propertyIsFilled(this.params, 'key')
  }

  // refresh object, read data from server
  override refresh():void{
    if(this.isNew()){return}

    this.formEventNotify.next({owner:this, params: LoadingStatus.START})
    this.loading = true

    const requestBuilder:IRequestBuilder = this.md.requestBuilderProvider.getRequestBuilder().getEntity(this.params.key)

    requestBuilder.odata_select(this.factory.odata_select)
    requestBuilder.odata_expand(this.factory.odata_expand)

    this.dataService.httpRequestGET(requestBuilder, this.factory, this.requestId)
  }
}
