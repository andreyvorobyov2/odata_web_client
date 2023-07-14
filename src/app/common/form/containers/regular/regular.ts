import { Component, Type } from "@angular/core";
import { RegularFormContent } from "src/app/core/form/host/content/RegularFormContent";
import { RegularFormManager } from "src/app/core/form/host/manager/RegularFormManager";

@Component({
  templateUrl:'./regular.html',
  styleUrls:['./regular.css'],
})
export class RegularFormMaterial extends RegularFormContent{}

@Component({
  selector:'regular-form-manager-material',
  template:'<ng-template DynamicContent></ng-template>'
})
export class RegularFormManagerMaterial extends RegularFormManager{
  override getComponent(): Type<RegularFormMaterial> {
    return RegularFormMaterial
  }
}
