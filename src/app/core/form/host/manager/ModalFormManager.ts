import { FormManager } from "./FormManager";
import { FormOpeningMode } from "../../Form";
import { ModalFormContent } from "../content/ModalFormContent";


export abstract class ModalFormManager extends FormManager<ModalFormContent> {
  override getFormOpeningMode(): FormOpeningMode {
    return FormOpeningMode.MODAL;
  }
}
