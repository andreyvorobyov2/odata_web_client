import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IDynamicContent } from "./IDynamicContent";
import { FormInfo } from "../../FormInfo";
import { FormContent } from "./FormContent";


@Directive({})
export class RegularFormContent extends FormContent implements IDynamicContent, OnInit, OnDestroy {

  public isActive: boolean = false;

  private sOnSwitchForm: Subscription = new Subscription();

  ngOnInit(): void {
    this.sOnSwitchForm = this.formService.onSwitchForm.subscribe(formInfo => { this.setIsActive(formInfo); });
  }

  ngOnDestroy(): void {
    this.sOnSwitchForm.unsubscribe();
  }

  public setIsActive(formInfo: FormInfo): void {
    this.isActive = (this.formInfo === formInfo);
  }
}
