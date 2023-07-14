import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from "@angular/core"
import { FormControl, ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";
import { DataSourceHttpService } from "src/app/core/data/DataSourceHttpService";
import { FormOpeningMode } from "src/app/core/form/Form";
import { FormService } from "src/app/core/form/FormService";
import { Utils } from "src/app/core/utils";
import { IEntity } from "src/app/core/data/entity/IEntity";
import { IForeignField } from "src/app/core/metadata/IMetadata";


export interface IReferenceFormControl{
  owner_data:any
  fk_field:IForeignField
}

@Component({
  selector:'reference-input-material',
  templateUrl:'./reference.html',
  styleUrls:['./reference.css'],
})
export class ReferenceInput implements OnInit, OnDestroy{
  refFormControl:FormControl = new FormControl()

  private _definition:IReferenceFormControl|undefined
  private _is_init_definition:boolean = false
  @Input() set definition(value:IReferenceFormControl|undefined){

    if(value != undefined){
      this._is_init_definition = true // for stop searching when set value to refFormControl
      this._definition = value
      this.ref = this.foreign_key
      this.refFormControl.setValue(this.ref.presentation)
      this.options = []
    }

  }
  get definition():IReferenceFormControl|undefined{
    return this._definition
  }

  @Input()
  labelText:string = ''

  @Output()
  refPresentationIsChanged = new EventEmitter<string>()

  private dataService:DataSourceHttpService = inject(DataSourceHttpService)
  private formService:FormService = inject(FormService)

  private searchSubscription:Subscription = new Subscription()
  private valueChangesSubsc:Subscription = new Subscription()

  ngOnInit(): void {

    this.valueChangesSubsc = this.refFormControl.valueChanges.subscribe(value=>{
      if(Ref.isRef(value)){
        // select ref from search results
        this.ref = <Ref><unknown>value
        this.options = []
        this.readyForInputSearchString = false
      }else{
        if(value != null && this.definition != undefined){
          if(this._is_init_definition){
            this._is_init_definition = false
            return
          }
          this.searchInProgress = true
          this.search(value)
        }
      }
    })

    this.searchSubscription = this.dataService.onHttpRequestGETComplete.subscribe(requstResult=>{
      if(this.searchId === requstResult.requestId){
        // fill option from result
        this.options=[]

        for(let row of requstResult.fetchedData.list){
          this.options.push(this.entity_to_ref((row.data as IEntity)))
        }
        // search complete, stop progress bar
        this.searchInProgress = false
      }

    })
  }


  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe()
    this.valueChangesSubsc.unsubscribe()
  }

  private searchId = Utils.makeid(5)
  searchInProgress:boolean = false

  private search(searchString:string){
    if(this.definition === undefined) return

    this.searchInProgress = true

    const fk_md = this.definition.fk_field.md
    let rb = fk_md.requestBuilderProvider.getRequestBuilder()
      .pageSize(10)
      .select(fk_md.primary_key)
      .select(fk_md.presentation)

      // search by presentation
      .search(searchString, fk_md.presentation)
    let factory = fk_md.factoryProvider.getListFactory()

    // run search Post
    this.dataService.httpRequestGET(rb, factory, this.searchId)
  }

  entity_to_ref(obj:IEntity):Ref{
    if(this.definition === undefined) return new Ref()

    const fk_md = this.definition.fk_field.md
    // @ts-ignore
    return Ref.createInstance(obj[fk_md.primary_key], obj[fk_md.presentation])
  }

  ref_buffer:Ref = new Ref()

  private _ref:Ref = new Ref()

  get ref():Ref{
    return this._ref
  }

  set ref(value:Ref){
    this.ref_buffer.clear()
    this._ref = value

    // update in owner
    this.foreign_key = value

    // validate form control
    this.setIncompleteInputError()
  }

  clear_ref(){
    this.ref_buffer = this.ref.copy()
    this.refFormControl.setValue(null)
    this.ref.clear()
    this.foreign_key = undefined
  }

  restore_ref(){
    this.refFormControl.setValue(null)
    this.ref = this.ref_buffer.copy()
    this.ref_buffer.clear()
    this.options = []
    this.readyForInputSearchString = false
  }

  get foreign_key():Ref{
    let value:string = ''
    let presentation:string = ''
    if(this.definition){
      let fk = this.definition.fk_field

      if(! Utils.valueIsFilled(this.definition.owner_data[fk.property_name])){
        this.definition.owner_data[fk.property_name] = {
          [fk.md.primary_key]:'',
          [fk.md.presentation]:'',
        }
      }

      value = this.definition.owner_data[fk.property_name][fk.md.primary_key]
      presentation = this.definition.owner_data[fk.property_name][fk.md.presentation]
    }
    return Ref.createInstance(value, presentation)
  }

  set foreign_key(object_reference:Ref|undefined){
    let value:string = ''
    let presentation:string = ''
    if(object_reference != undefined){
      value = object_reference.value
      presentation = object_reference.presentation
    }
    if(this.definition){
      let fk = this.definition.fk_field
      this.definition.owner_data[fk.property_name][fk.md.primary_key] = value
      this.definition.owner_data[fk.property_name][fk.md.presentation] = presentation
    }
    this.refPresentationIsChanged.emit(presentation)
  }

  readyForInputSearchString = false
  resetForSearch(event:any){
    if(this.readyForInputSearchString){
      return
    }
    if(this.ref.isFilled() && event.key != 'Enter'){
      this.ref_buffer = this.ref.copy()
      this.ref.clear()
      this.foreign_key = undefined
      this.readyForInputSearchString = true
      this.refFormControl.setValue(null)
    }
  }

  openChoiceForm(){
    if(this.definition){
      this.formService.openForm(this.definition.fk_field.md.formProvider.getListForm(),
        FormOpeningMode.REGULAR, {choiceMode: true, referenceInput: this})
    }
  }

  openObjectForm(){
    if(this.definition){
      this.formService.openForm(this.definition.fk_field.md.formProvider.getObjectForm(),
        FormOpeningMode.REGULAR, {key: this.ref.value})
    }
  }

  options:Ref[] = []

  setIncompleteInputError(){
    let isFilled = false

    let ref = <Ref><unknown>this.refFormControl.value
    // ref is filled
    if(Ref.isRef(ref)){
      isFilled = ref.isFilled()
    }else{
      // string is filled
      if(this.refFormControl.value != null && this.refFormControl.value != ''){
        isFilled = true
      }
    }

    let isValid = !(this.ref.isEmpty() && isFilled)

    if(isValid){
      this.refFormControl.setErrors(null)
    }else{
      let err:ValidationErrors = {incompleteInputError: true}
      this.refFormControl.setErrors(err)
    }
  }

  onBlur(){
    // validate form control
    setTimeout(() => {
      this.setIncompleteInputError()
    }, 500);
  }

  moveCursorPositionToBegin(input: HTMLInputElement){
    input.setSelectionRange(0, 0)
  }

}

class Ref extends Object{
  value:string = ''
  presentation:string = ''

  isEmpty():boolean{
    return ! Utils.valueIsFilled(this.value)
  }

  isFilled():boolean{
    return Utils.valueIsFilled(this.value)
  }

  clear():void{
    this.value = ''
    this.presentation = ''
  }

  copy():Ref{
    return Ref.createInstance(this.value, this.presentation)
  }

  static createInstance(value:string, presentation:string):Ref{
    let new_obj = new Ref()
    new_obj.value = value
    new_obj.presentation = presentation
    return new_obj
  }

  static isRef(value:any){
    if(value === null || value === undefined)
      return false
    return value.hasOwnProperty('value')
  }

  override toString(): string {
    return this.presentation
  }
}
