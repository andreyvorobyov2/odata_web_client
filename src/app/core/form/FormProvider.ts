import { Type } from "@angular/core";
import { IForm } from "./IForm";
import { IFormProvider } from "src/app/core/form/IFormProvider";
import { IListForm } from "src/app/core/form/datasource.form/list.form/IListForm";
import { IObjectForm } from "src/app/core/form/datasource.form/object.form/IObjectForm";
import { IFormDefinition } from "./IFormDefinition";
import { FormType } from "./Form";
import { Metadata } from "../metadata/Metadata";

export class FormProvider implements IFormProvider {

  constructor(
    private metadataClassName: string,

    private listForm: Type<IListForm> | undefined,
    private objectForm: Type<IObjectForm> | undefined,

    private rowForm: Type<IForm> | undefined) { }


  getForm(formType: FormType):IFormDefinition{
    switch(formType){
      case FormType.LIST_FORM: return this.getListForm()
      case FormType.OBJECT_FORM: return this.getObjectForm()
      case FormType.ROW_FORM: return this.getRowForm()
      default: throw Error('unsupported form type')
    }
  }

  getListForm(): IFormDefinition {
    if (this.listForm === undefined)
      throw Error('object form class is undefined')

    return { component: this.listForm, md: Metadata.createInstance(this.metadataClassName), formType: FormType.LIST_FORM }
  }

  getObjectForm(): IFormDefinition {
    if (this.objectForm === undefined)
      throw Error('object form class is undefined');

    return { component: this.objectForm, md: Metadata.createInstance(this.metadataClassName), formType: FormType.OBJECT_FORM }
  }

  getRowForm(): IFormDefinition {
    if (this.rowForm === undefined)
      throw Error('row form class is undefined');

    return { component: this.rowForm, md: Metadata.createInstance(this.metadataClassName), formType: FormType.ROW_FORM }
  }
}
