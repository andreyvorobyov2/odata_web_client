
import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { FormOpeningMode, FormType} from "./Form"
import { FormInfo } from "./FormInfo"
import { IForm } from "./IForm"
import { IFormDefinition } from "./IFormDefinition"
import { IMetadata } from "../metadata/IMetadata"
import *  as metadata from "../../app.metadata";

interface ISavedForm{
  params:any
  metadataClassName:string
  formType:FormType
  isActive:boolean
}

@Injectable({providedIn:"root"})
export class FormService{

  private counter:number = 0
  private forms:FormInfo[]=[]
  private activeFormID:number = -1

  getForms():FormInfo[]{
    return this.forms
  }

  getActiveFormID():number{
    return this.activeFormID
  }

  private openFormNotify:Subject<FormInfo> = new Subject<FormInfo>()
  onOpenForm:Observable<any> = this.openFormNotify.asObservable()

  private createFormInfo(formDefinition: IFormDefinition, formOpeningMode:FormOpeningMode, params:any={}):FormInfo{
    let formInfo:FormInfo = new FormInfo(formDefinition, this.counter++, formOpeningMode)
    formInfo.params = params
    this.forms.push(formInfo)
    this.openFormNotify.next(formInfo)
    return formInfo
  }

  openForm(formDefinition: IFormDefinition, formOpeningMode:FormOpeningMode, params:any={}){
    let formInfo:FormInfo = this.createFormInfo(formDefinition, formOpeningMode, params)
    if(formOpeningMode === FormOpeningMode.REGULAR){
      this.switchForm(formInfo)
    }else{
      this.saveToLocalStorage()
    }
  }

  private closeFormNotify:Subject<FormInfo> = new Subject<FormInfo>()
  onCloseForm:Observable<any> = this.closeFormNotify.asObservable()

  closeForm(form:IForm){
    let formInfo:FormInfo|undefined = this.forms.find(i => i.instance === form)
    let index = this.forms.findIndex(i => i === formInfo)
    if(index < 0){
      throw Error('form not found')
    }
    this.forms.splice(index,1)
    if(formInfo)
      this.closeFormNotify.next(formInfo)

    if(this.activeFormID === formInfo?.id && this.forms.length){
      this.switchForm(this.forms[this.forms.length -1])
    }else{
      this.saveToLocalStorage()
    }
  }

  private switchFormNotify:Subject<FormInfo> = new Subject<FormInfo>()
  onSwitchForm:Observable<any> = this.switchFormNotify.asObservable()

  switchForm(formInfo:FormInfo){
    this.activeFormID = formInfo.id
    this.switchFormNotify.next(formInfo)
    this.saveToLocalStorage()
  }

  restoreFromLocalStorage(){
    const value : string | null = localStorage.getItem('savedForms')
    if(value === null){ return }

    const arr:ISavedForm[] = JSON.parse(value)
    const restoredFormInfo:FormInfo[] = []
    for(let savedForm of arr){
      const md:IMetadata = new metadata[savedForm.metadataClassName as keyof typeof metadata]()
      let formDefinition:IFormDefinition = md.formProvider.getForm(savedForm.formType)
      let formInfo:FormInfo = this.createFormInfo(formDefinition, FormOpeningMode.REGULAR, savedForm.params)
      if(savedForm.isActive){
        this.activeFormID = formInfo.id
        this.switchFormNotify.next(formInfo)
      }
      restoredFormInfo.push(formInfo)
    }
  }

  private saveToLocalStorage(){
    const arr:ISavedForm[] = []
    for(let form of this.forms){
      const sf:ISavedForm = {
        params: form.params,
        formType: form.formType,
        metadataClassName : form.md.className,
        isActive: (form.id === this.activeFormID)
      }
      arr.push(sf)
    }
    localStorage.setItem('savedForms', JSON.stringify(arr))
  }

}
