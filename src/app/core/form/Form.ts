import { Directive, inject} from "@angular/core"
import { FormService } from "./FormService"
import { IFormEventNotifyParameters } from "./IFormEventNotifyParameters";
import { IForm } from "./IForm";
import { IMetadata } from "../metadata/IMetadata";
import { Observable, Subject } from "rxjs";

export enum FormOpeningMode{
  REGULAR = '_FORM_OPENING_MODE_REGULAR_',
  MODAL = '_FORM_OPENING_MODE_MODAL_'
}

export enum FormType{
  LIST_FORM = '_FORM_TYPE_LIST_FORM_',
  OBJECT_FORM = '_FORM_TYPE_OBJECT_FORM_',
  ROW_FORM = '_FORM_TYPE_ROW_FORM_'
}

export enum CommandPanelVariant{
  DEFAULT = '_CPV_DEFAULT',
  LIST_FORM = '_CPV_LIST_FORM',
  LIST_FROM_CHOICE_MODE = '_CPV_LIST_FROM_CHOICE_MODE_',

  CATALOG_OBJECT_FORM = '_CPV_CATALOG_OBJECT_FORM_',
  DOCUMENT_OBJECT_FORM = '_CPV_DOCUMENT_OBJECT_FORM_',

  TABULAR_SECTION_ROW = '_CPV_TABULAR_SECTION_ROW_',
}

export enum LoadingStatus{
  START = '_LOADING_STATUS_START_',
  COMPLETE = '_LOADING_STATUS_COMPALETE_',
  FAIL = '_LOADING_STATUS_FAIL_'
}

export enum FormStatus{
  CHOICE_ITEM_SELECTED = '_FORM_STATUS_CHOICE_ITEM_SELECTED_',
}

@Directive({})
export abstract class Form implements IForm{

  params: any
  // @ts-ignore
  md: IMetadata

  abstract title: string
  loading = false

  protected formService:FormService = inject(FormService)

  protected formEventNotify:Subject<IFormEventNotifyParameters> = new Subject<IFormEventNotifyParameters>()
  onFormEventNotify: Observable<IFormEventNotifyParameters> = this.formEventNotify.asObservable()

  onCreateForm(): void {}

  close(){
    this.formService.closeForm(this)
  }

  getCommandPanelVariant(): CommandPanelVariant {
    return CommandPanelVariant.DEFAULT
  }
}


