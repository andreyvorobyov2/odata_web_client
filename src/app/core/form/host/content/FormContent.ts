import { Directive } from "@angular/core";
import { DynamicHost } from "../DynamicHost";
import { FormInfo } from "../../FormInfo";
import { IForm } from "../../IForm";

@Directive({})
export abstract class FormContent extends DynamicHost{

  public formInfo:FormInfo|undefined;

  closeForm(){
    if(this.formInfo?.instance)
      this.formService.closeForm(this.formInfo?.instance)
  }

  loadContent(formInfo:FormInfo){
    if(this.DynamicHost === undefined){
      console.error('Dynamic host is undefined')
      return
    }
    const dynFormRef =
    this.DynamicHost.viewContainerRef.createComponent<IForm>(formInfo.component);
    dynFormRef.instance.params = formInfo.params
    dynFormRef.instance.md =  formInfo.md

    dynFormRef.instance.onCreateForm()

    formInfo.instance = dynFormRef.instance
    formInfo.commandPanelVariant = dynFormRef.instance.getCommandPanelVariant()
  }
}
