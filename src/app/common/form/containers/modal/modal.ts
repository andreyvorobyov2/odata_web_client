import { Component, Type} from "@angular/core";
import { ModalFormContent } from "src/app/core/form/host/content/ModalFormContent";
import { ModalFormManager } from "src/app/core/form/host/manager/ModalFormManager";


@Component({
  templateUrl:'./modal.html',
  styleUrls:['./modal.css'],
})
export class ModalFormMaterial extends ModalFormContent{}

@Component({
  selector:'modal-form-manager-material',
  template:'<ng-template DynamicContent></ng-template>'
})
export class ModalFormManagerMaterial extends ModalFormManager{
  override getComponent(): Type<ModalFormMaterial> {
    return ModalFormMaterial
  }
}

