import { IAttribute } from "src/app/core/metadata/IMetadata"
import { ControlTypes, IFormControl, IFormControl_Input } from "../controls/controls"
import { IReferenceFormControl } from "../controls/reference"


export class DefaultObjectForm {

  attributes: IAttribute[] = []

  private _rfc : Map<string, IReferenceFormControl> = new Map()
  private _rfcPresentations : Map<string, string> = new Map()

  setDataSource(dataSource:any):void{
    for(let attr of this.attributes){
      if(attr.foreignField != undefined && this.isReferenceInput(attr.formControl)){
        this._rfc.set(attr.dataPath, {
          owner_data: dataSource.data,
          fk_field: attr.foreignField
        })
      }
    }
  }

  getReferenceDefenition(attr: IAttribute):IReferenceFormControl|undefined{
    return this._rfc.get(attr.dataPath)
  }

  onRefetencePresentationChanged(attr: IAttribute, presentation:string){
    setTimeout(() => {
      this._rfcPresentations.set(attr.dataPath, presentation)
    }, 0)
  }

  getReferencePresentation(attr: IAttribute):string{
    const presentation: string | undefined = this._rfcPresentations.get(attr.dataPath)
    if(presentation === undefined){
      return ''
    }
    return presentation
  }

  getInputMaxLength(ctrl: IFormControl | undefined): number | null{
    if(ctrl === undefined) return null
    const _input : IFormControl_Input = (ctrl.control as IFormControl_Input)
    return _input.maxLength === undefined ? null : _input.maxLength
  }

  getInputType(ctrl: IFormControl | undefined): string{
    if(ctrl === undefined) return 'text'
    const _input : IFormControl_Input = (ctrl.control as IFormControl_Input)
    return _input.inputType === undefined ? 'text' : _input.inputType
  }

  isLabel(ctrl:IFormControl | undefined):boolean{
    if(ctrl === undefined) return false
    return ctrl.controlType === ControlTypes.Label
  }

  isSingleLineInput(ctrl:IFormControl | undefined):boolean{
    if(ctrl === undefined) return false
    return ctrl.controlType === ControlTypes.Input
      && (ctrl.control as IFormControl_Input).multiline != true
  }

  isMultiLineInput(ctrl:IFormControl | undefined):boolean{
    if(ctrl === undefined) return false
    return ctrl.controlType === ControlTypes.Input
      && (ctrl.control as IFormControl_Input).multiline === true
  }

  isReferenceInput(ctrl:IFormControl | undefined):boolean{
    if(ctrl === undefined) return false
    return ctrl.controlType === ControlTypes.ReferenceInput
  }
}

