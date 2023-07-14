
import { FormType } from "./Form";
import { IFormDefinition } from "./IFormDefinition";


export interface IFormProvider {
  getForm(formType: FormType):IFormDefinition

  getListForm(): IFormDefinition
  getObjectForm(): IFormDefinition

  getRowForm(): IFormDefinition
}
