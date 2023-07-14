
import { IFormProvider } from "../form/IFormProvider";
import { IRequestBuilderProvider } from "../data/request.builder/IRequestBuilderProvider";
import { IFactoryProvider } from "../data/factory/IFactoryProvider";
import { IFormControl } from "src/app/common/form/controls/controls";

export interface IAttribute{
  dataPath: string
  showInList?:boolean
  columnTitle?:string
  foreignField?:IForeignField
  formControl?: IFormControl
}

export interface IForeignField{
  md:IMetadata
  property_name:string
}

export interface ITabularSection{
  table_md:IMetadata
  name:string
  columns?:string[]
  foreignColumns?:IForeignField[]
}

export interface IObjectFields{
  md:IMetadata
  fields?:string[]
  foreignFields?:IForeignField[]
  tabularSections?:ITabularSection[]
}

export interface IColumn{
  title:string
  dataPath:string
  is_hidden?:boolean
}

export interface IListColumns{
  md:IMetadata
  columns?:IColumn[]
}

export interface IMetadata {
  presentation: string
  primary_key: string

  attributes: IAttribute[]

  tabular_sections: ITabularSection[]

  // <property_name, foreign_field>
  foreign_keys: Map<string, IForeignField>

  // providers
  factoryProvider: IFactoryProvider
  formProvider: IFormProvider
  requestBuilderProvider: IRequestBuilderProvider

  className: string
}
