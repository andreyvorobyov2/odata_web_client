import { FormInfo } from "../../FormInfo";


export interface IDynamicContent {
  loadContent(formInfo: FormInfo): void;
  setIsActive(formInfo: FormInfo): void;
  formInfo: FormInfo | undefined;
}
