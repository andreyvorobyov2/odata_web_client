import { Directive, OnDestroy, OnInit } from "@angular/core"
import { LoadingStatus } from "../../Form"
import { DataSourceForm } from "../DataSourceForm"
import { Subscription } from "rxjs"
import { IListForm } from "./IListForm"
import { EmptyMetadataProxy } from "../../../metadata/EmptyMetadataProxy"
import { IListFactory } from "src/app/core/data/factory/list.factory/IListFactory"
import { IFactory } from "src/app/core/data/factory/IFactory"
import { IRequestBuilder } from "src/app/core/data/request.builder/IRequestBuilder"
import { IListEntity } from "src/app/core/data/entity/list.entity/IListEntity"
import { IColumn, IListColumns } from "src/app/core/metadata/IMetadata"


@Directive({})
export abstract class AbstractListForm extends DataSourceForm implements IListForm, OnInit, OnDestroy{

  // @ts-ignore
  factory:IListFactory

  pageSize  = 2
  pageIndex = 0
  totalRecords = 0

  abstract select():void
  abstract create():void

  protected abstract setDataSource(dataTable:IListEntity):void


  protected columns:IColumn[] = []

  override onCreateForm(): void {
    super.onCreateForm()

    let _columns:IColumn[] = []
    for(let a of this.md.attributes){
      if(a.showInList === true){
        _columns.push({
          dataPath: a.dataPath,
          title: a.columnTitle === undefined ? a.dataPath : a.columnTitle,
        })
      }
    }

    if(_columns.findIndex(i=>(i.dataPath === this.md.primary_key)) === -1){
      _columns.push({
        dataPath: this.md.primary_key,
        title: 'PK',
        is_hidden: true
      })
    }

    this.columns = _columns

    const _list_columns:IListColumns = {
      md: this.md,
      columns: _columns
    }

    this.factory = this.md.factoryProvider.getListFactory().initializeColumns(_list_columns)
  }

  private httpGETCompleteSubs:Subscription = new Subscription()
  private httpErrorSubs:Subscription = new Subscription()

  private isRequestForTotalRecords:boolean = false

  override ngOnInit(): void {
    super.ngOnInit()
    this.httpGETCompleteSubs = this.dataService.onHttpRequestGETComplete.subscribe(requestResult=>{

      if(requestResult.requestId === this.requestId){

        if(this.isRequestForTotalRecords){

          this.isRequestForTotalRecords = false

          // request complete
          this.totalRecords = requestResult.fetchedData.data.totalRecords
          this.onDataFetched()

        }else{

          this.isRequestForTotalRecords = true

          // receive table
          let dataTable:IListEntity = <IListEntity>requestResult.fetchedData
          this.setDataSource(dataTable)

          // and send new request for count
          this.requestForTotalRecords()
        }

      }

    })

    this.httpErrorSubs = this.dataService.onHttpRequestError.subscribe(requestError=>{
      if(requestError.requestId === this.requestId){
        this.isRequestForTotalRecords = false
        this.loading = false
        this.formEventNotify.next({owner:this, params: LoadingStatus.COMPLETE})
      }
    })

  }

  ngOnDestroy(): void {
    this.httpGETCompleteSubs.unsubscribe()
    this.httpErrorSubs.unsubscribe
  }

  /* Request Total Records */
  private requestForTotalRecords(){
    let requestBuilder:IRequestBuilder = this.md.requestBuilderProvider.getRequestBuilder()
    requestBuilder.requestForTotalRecords()

    let factory:IFactory = EmptyMetadataProxy.getInstance().factoryProvider.getObjectFactory()

    this.dataService.httpRequestGET(requestBuilder, factory, this.requestId)
  }

  /* Request Data */
  public override refresh(){
    this.formEventNotify.next({owner:this, params: LoadingStatus.START})

    this.loading = true

    let requestBuilder:IRequestBuilder = this.md.requestBuilderProvider.getRequestBuilder()
      .pageSize(this.pageSize)
      .pageIndex(this.pageIndex)


    requestBuilder.odata_select(this.factory.odata_select)
    requestBuilder.odata_expand(this.factory.odata_expand)

    this.dataService.httpRequestGET(requestBuilder, this.factory, this.requestId)
  }
}
