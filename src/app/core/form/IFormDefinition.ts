import { Type } from "@angular/core";
import { IForm } from "./IForm";
import { IMetadata } from "../metadata/IMetadata";
import { FormType } from "./Form";

export interface IFormDefinition {
  component: Type<IForm>
  md: IMetadata
  formType: FormType
}
