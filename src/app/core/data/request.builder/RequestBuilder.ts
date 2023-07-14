
import { IRequestBuilder } from "src/app/core/data/request.builder/IRequestBuilder";
import { Utils } from "src/app/core/utils";

export class RequestBuilder implements IRequestBuilder{
  protected _base_url:string = 'api/'
  protected _resource:string = ''

  private params = {$format:'json'}

  constructor(resource:string = ''){
    this.odata_resource(resource)
  }

  odata_resource(value: string): IRequestBuilder {
    if(value != ''){
      this._resource = value
    }
    return this
  }


  private _odata_select:string[] =[]
  odata_select(value: string[]): IRequestBuilder {
    value.forEach(i=>Utils.arr_add_unique(this._odata_select, i))
    return this
  }

  private _odata_expand:string[] =[]
  odata_expand(value: string[]): IRequestBuilder {
    value.forEach(i=>Utils.arr_add_unique(this._odata_expand, i))
    return this
  }

  private _isRequestForQuantity = false
  requestForTotalRecords(): IRequestBuilder {
    this._isRequestForQuantity = true
    return this
  }

  private _skip:number = 0
  pageIndex(value: number): IRequestBuilder {
    this._skip = value * this._top
    return this
  }

  private _top:number = 0
  pageSize(value: number): IRequestBuilder {
    this._top = value
    return this
  }

  private _entity:string = ''
  getEntity(key: string): IRequestBuilder {
    this._entity = key
    this._filter = `Ref_Key eq guid'${key}'`
    return this
  }

  private _appendToUrl:string[] = []
  appendToUrl(value: string): IRequestBuilder {
    this._appendToUrl.push(value)
    return this
  }

  private _select:string[]=[]
  select(value: string | string[]): IRequestBuilder {
    if(Array.isArray(value)){
      this._select.push(...value)
    }else{
      this._select.push(value)
    }

    return this
  }

  protected _filter:string = ''
  search(value: string, property:string): IRequestBuilder {
    this._filter = `substringof('${value}', ${property}) eq true`
    return this
  }

  getParams():any {

    // $select=Ref_Key,Description
    if(this._select.length > 0){
      // @ts-ignore
      this.params['$select'] = this._select.join(',')
    }

    if(this._skip > 0){
      // @ts-ignore
      this.params['$skip'] = this._skip
    }

    if(this._top > 0){
      // @ts-ignore
      this.params['$top'] = this._top
    }

    if(this._filter  != ''){
      // @ts-ignore
      this.params['$filter'] = this._filter
    }

    if(this._odata_select.length > 0){
      // @ts-ignore
      this.params['$select'] = this._odata_select.join(',')
    }

    if(this._odata_expand.length > 0){
      // @ts-ignore
      this.params['$expand'] = this._odata_expand.join(',')
    }

    return this.params
  }

  patchUrl(): string {
    return this._base_url + this._resource + `(guid'${this._entity}')`
  }

  postUrl(): string {
    return this._base_url + this._resource
  }

  getUrl(): string {
    // Catalog_Name/$count
    if(this._isRequestForQuantity)
      return this._base_url + this._resource + '/$count'


    if(this._entity != '')
      return this._base_url + this._resource

    // Catalog_Name
    if(this._resource != '')
      return this._base_url + this._resource

    return  this._base_url
  }
}
