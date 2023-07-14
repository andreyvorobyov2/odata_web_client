import { FormManager } from "./FormManager";
import { FormOpeningMode } from "../../Form";
import { RegularFormContent } from "../content/RegularFormContent";


export abstract class RegularFormManager extends FormManager<RegularFormContent> {
  override getFormOpeningMode(): FormOpeningMode {
    return FormOpeningMode.REGULAR;
  }
}
