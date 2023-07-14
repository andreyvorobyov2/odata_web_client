import { Directive } from "@angular/core";
import { IDynamicContent } from "./IDynamicContent";
import { FormContent } from "./FormContent";
import { FormInfo } from "../../FormInfo";


@Directive({})
export class ModalFormContent extends FormContent implements IDynamicContent {
  setIsActive(formInfo: FormInfo): void { }
}
