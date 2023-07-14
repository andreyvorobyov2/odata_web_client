import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CommandPanelVariant, FormStatus, LoadingStatus } from "src/app/core/form/Form";
import { FormInfo } from "src/app/core/form/FormInfo";
import { IForm } from "src/app/core/form/IForm";
import { Subscription } from "rxjs";
import { IDataSourceForm } from "src/app/core/form/datasource.form/IDataSourceForm";
import { IObjectForm } from "src/app/core/form/datasource.form/object.form/IObjectForm";
import { IListForm } from "src/app/core/form/datasource.form/list.form/IListForm";
import { FormContent } from "src/app/core/form/host/content/FormContent";
import { ITabularSectionRowForm } from "../controls/ITabularSectionRowForm";

@Component({
  selector:'command-panel',
  templateUrl:'./header.html',
  styleUrls:['./header.css']
})
export class CommandPanel extends FormContent implements OnInit, OnDestroy{

  @Input()
  linkedFormInfo:FormInfo|undefined

  disabled = true

  select_disabled = true

  private formNotifySubs:Subscription = new Subscription();
  ngOnInit(): void {
    if(this.linkedFormInfo?.instance != undefined){
      this.formNotifySubs = this.linkedFormInfo.instance.onFormEventNotify.subscribe(p=>{
        if(p.params === LoadingStatus.START)
          this.disabled = true
        if(p.params === LoadingStatus.COMPLETE)
          this.disabled = false
        if(p.params === FormStatus.CHOICE_ITEM_SELECTED)
          this.select_disabled = false
      })
    }
  }

  ngOnDestroy(): void {
    this.formNotifySubs.unsubscribe()
  }

  // IForm
  override closeForm(): void {
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as IForm).close()
    }
  }

  // IDataSourceForm
  refresh():void{
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as IDataSourceForm).refresh()
    }
  }

  // IListForm
  createNewObject(){
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as IListForm).create()
    }
  }

  select(){
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as IListForm).select()
    }
  }

  // IObjectForm
  save(){
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as IObjectForm).save()
    }
  }

  isNew():boolean{
    if(this.linkedFormInfo?.instance != undefined){
      return (this.linkedFormInfo.instance as IObjectForm).isNew()
    }
    return false
  }

  copy(){}
  post(){}
  markForDeletion(){}

  // TabularSection
  tabularSectionRowOk(){
    if(this.linkedFormInfo?.instance != undefined){
      (this.linkedFormInfo.instance as ITabularSectionRowForm).ok()
    }
  }

  cpv_LIST_FORM(){return this.linkedFormInfo?.commandPanelVariant === CommandPanelVariant.LIST_FORM}

  cpv_LIST_FORM_CHOICE_MODE(){return this.linkedFormInfo?.commandPanelVariant === CommandPanelVariant.LIST_FROM_CHOICE_MODE}

  cpv_CATALOG_OBJECT_FORM(){return this.linkedFormInfo?.commandPanelVariant === CommandPanelVariant.CATALOG_OBJECT_FORM}

  cpv_DOCUMENT_OBJECT_FORM(){return this.linkedFormInfo?.commandPanelVariant === CommandPanelVariant.DOCUMENT_OBJECT_FORM}

  cpv_TABULAR_SECTION_ROW(){return this.linkedFormInfo?.commandPanelVariant === CommandPanelVariant.TABULAR_SECTION_ROW}

}
