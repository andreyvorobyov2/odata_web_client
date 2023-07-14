import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, forkJoin, of } from "rxjs";
import { catchError, delay, map, timeout} from "rxjs/operators"
import { IListEntity } from "./entity/list.entity/IListEntity";
import { IObjectEntity } from "./entity/object.entity/IObjectEntity";
import { IRequestBuilder } from "./request.builder/IRequestBuilder";
import { IEntity } from "./entity/IEntity";
import { IObjectFactory } from "./factory/object.factory/IObjectFactory";
import { IFactory } from "./factory/IFactory";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IRequestResult } from "./IRequestResult";
import { IRequestError } from "./IRequestError";


@Injectable({providedIn:'root'})
export class DataSourceHttpService{

  constructor(private http:HttpClient){}

  private GET_CompleteNotify:Subject<IRequestResult> = new Subject<IRequestResult>()
  onHttpRequestGETComplete:Observable<IRequestResult> = this.GET_CompleteNotify.asObservable()

  private PATCH_CompleteNotify:Subject<IRequestResult> = new Subject<IRequestResult>()
  onHttpRequestPATCHComplete:Observable<IRequestResult> = this.PATCH_CompleteNotify.asObservable()

  private POST_CompleteNotify:Subject<IRequestResult> = new Subject<IRequestResult>()
  onHttpRequestPOSTComplete:Observable<IRequestResult> = this.POST_CompleteNotify.asObservable()

  private ERROR_Notify:Subject<IRequestError> = new Subject<IRequestError>()
  onHttpRequestError:Observable<IRequestError> = this.ERROR_Notify.asObservable()

  public httpRequestGET(requestBuilder:IRequestBuilder, factory:IFactory, requestId:string){
    const observables:Observable<IObjectEntity|IListEntity>[] = []

    observables.push(this._executeRequestGET(requestBuilder, factory, requestId))
    let first_cal = true
    let fetchedData:any

    forkJoin(observables).subscribe(array_of_results=>{
      this.executeRequestGET(array_of_results, first_cal, fetchedData, requestId)
    })
  }

  public httpRequestPATCH(data:IEntity, requestBuilder:IRequestBuilder, factory:IObjectFactory, requestId:string){
    this._executeRequestPATCH(data, requestBuilder, factory, requestId).subscribe(data=>{
      this.PATCH_CompleteNotify.next({fetchedData: data, requestId: requestId})
    })
  }

  public httpRequestPOST(data:IEntity, requestBuilder:IRequestBuilder, factory:IObjectFactory, requestId:string){
    this._executeRequestPOST(data, requestBuilder, factory, requestId).subscribe(data=>{
      this.POST_CompleteNotify.next({fetchedData: data, requestId: requestId})
    })
  }

  private dataIsFetchedGET(data:IObjectEntity|IListEntity, requestId:string){
    this.GET_CompleteNotify.next({fetchedData: data, requestId: requestId})
  }

  private snackBar:MatSnackBar = inject(MatSnackBar)

  private _executeRequestGET(requestBuilder:IRequestBuilder, factory:IFactory, requestId:string):Observable<IObjectEntity|IListEntity>{
    return this.http.get<IObjectEntity|IListEntity>(requestBuilder.getUrl(), {params:requestBuilder.getParams()})    //.pipe(delay(5000))
    .pipe(timeout(10000)) // 10 sec
    .pipe(catchError((err:HttpErrorResponse)=>{
      // show error message
      this.snackBar.open(err.message, 'Close',{horizontalPosition:"center", verticalPosition:"top"})
      this.ERROR_Notify.next({error: err, requestId:requestId})
      return of()
    }))
    .pipe(map(data=>factory.createFilledInstance(data)))
  }

  private _executeRequestPATCH(data:IEntity, requestBuilder:IRequestBuilder, factory:IFactory, requestId:string):Observable<IObjectEntity|IListEntity>{
    return this.http.patch<any>(requestBuilder.patchUrl(), data, {params:requestBuilder.getParams()})
      .pipe(timeout(10000)) // 10 sec
      .pipe(catchError((err:HttpErrorResponse)=>{
        // show error message
        this.snackBar.open(err.message, 'Close',{horizontalPosition:"center", verticalPosition:"top"})
        this.ERROR_Notify.next({error: err, requestId:requestId})
        return of()
      }))
  }

  private _executeRequestPOST(data:IEntity, requestBuilder:IRequestBuilder, factory:IFactory, requestId:string):Observable<IObjectEntity|IListEntity>{
    return this.http.post<any>(requestBuilder.postUrl(), data, {params:requestBuilder.getParams()})
      .pipe(timeout(10000)) // 10 sec
      .pipe(catchError((err:HttpErrorResponse)=>{
        // show error message
        this.snackBar.open(err.message, 'Close',{horizontalPosition:"center", verticalPosition:"top"})
        this.ERROR_Notify.next({error: err, requestId:requestId})
        return of()
      }))
  }

  private executeRequestGET(array_of_results:(IObjectEntity|IListEntity)[], first_cal:boolean, fetchedData:any, requestId:string){

    let observables:Observable<IObjectEntity|IListEntity>[] = []

    for(let item_of_result of array_of_results){
      if(first_cal){
        first_cal = false
        fetchedData = item_of_result
      }

      if(item_of_result.hasOwnProperty('list')){
        let _data_list:IListEntity = <IListEntity> item_of_result
        for(let _data_object of _data_list.list){
          this.collectObservables(observables, _data_object, requestId)
        }
      }

      if(item_of_result.hasOwnProperty('data')){
        let _data_object:IObjectEntity = <IObjectEntity> item_of_result
        this.collectObservables(observables, _data_object, requestId)
      }

    }

    if(observables.length){
      forkJoin(observables).subscribe(array_of_results=>{
        this.executeRequestGET(array_of_results, first_cal, fetchedData, requestId)
      })
    }else{
      this.dataIsFetchedGET(fetchedData, requestId)
    }
  }

  private collectObservables(observables:Observable<IObjectEntity|IListEntity>[], _data_object:IObjectEntity, requestId:string){
    for(let ext_data of _data_object.data.ext_entity.extData){
      observables.push(this._executeRequestGET(ext_data.requestBuilder, ext_data.factory, requestId))
    }
  }
}


