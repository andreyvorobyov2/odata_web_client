import { Directive, OnDestroy, OnInit, Type } from "@angular/core"
import { DynamicHost } from "../DynamicHost"
import { IDynamicContent } from "../content/IDynamicContent"
import { Subscription } from "rxjs"
import { FormOpeningMode } from "../../Form"
import { FormInfo } from "../../FormInfo"

@Directive({})
export abstract class FormManager<T extends IDynamicContent> extends DynamicHost implements OnInit, OnDestroy {

  private sOnOpenForm: Subscription = new Subscription()
  private sOnCloseForm: Subscription = new Subscription()

  ngOnInit(): void {
    this.sOnOpenForm = this.formService.onOpenForm.subscribe(formInfo => { this.onOpenForm(formInfo) })
    this.sOnCloseForm = this.formService.onCloseForm.subscribe(formInfo => { this.onCloseForm(formInfo) })
  }

  ngOnDestroy(): void {
    this.sOnOpenForm.unsubscribe()
    this.sOnCloseForm.unsubscribe()
  }

  private onOpenForm(formInfo: FormInfo) {
    if (formInfo.openingMode === this.getFormOpeningMode()) {
      if(this.DynamicHost === undefined){
        console.error('Dynamic host is undefined')
        return
      }

      const viewRef = this.DynamicHost.viewContainerRef.createComponent<T>(this.getComponent())

      formInfo.viewRef.push(viewRef.hostView)

      viewRef.instance.loadContent(formInfo)
      viewRef.instance.formInfo = formInfo
      viewRef.instance.setIsActive(formInfo)
    }
  }

  private onCloseForm(formInfo: FormInfo): void {
    if (this.DynamicHost) {
      for (let v of formInfo.viewRef) {
        let index: number = this.DynamicHost.viewContainerRef.indexOf(v)
        if (index >= 0)
          this.DynamicHost.viewContainerRef.remove(index)
      }
    }
  }

  abstract getComponent(): Type<T>
  abstract getFormOpeningMode(): FormOpeningMode
}
