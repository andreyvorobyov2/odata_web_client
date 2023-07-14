
export enum ControlTypes{
  Input = '_ControlTypes_Input_',
  Label = '_ControlTypes_Label_',
  ReferenceInput = '_ControlTypes_ReferenceInput_'
}

export interface IFormControl_Label{
  title: string
}

export interface IFormControl_Input{
  title: string
  inputType?: string // text | number
  maxLength?: number
  multiline?:boolean
  readOnly?:boolean
}

export interface IFormControl_ReferenceInput{
  title:string
}

export interface IFormControl{
  controlType: ControlTypes
  control : (IFormControl_Input
    | IFormControl_ReferenceInput)
}
