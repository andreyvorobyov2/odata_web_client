import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormService } from "./core/form/FormService";
import { FormOpeningMode } from "src/app/core/form/Form";
import { FormInfo } from "./core/form/FormInfo";
import { MatDrawer } from "@angular/material/sidenav";
import { Metadata } from "./core/metadata/Metadata";
import { Subscription } from "rxjs";

@Component({
  selector:'app-material',
  templateUrl:'./app.html',
  styleUrls:['./app.css']
})
export class AppMaterialComponent implements OnInit, OnDestroy, AfterViewInit{

  panelOpenState = false

  forms:FormInfo[]=[]
  activeFormID:number = -1

  tabSelectedIndex:number = -1

  constructor(private fsrv:FormService){}

  @ViewChild('drawer')
  drawer:MatDrawer | undefined

  @HostListener("window:pageshow", ["$event"])
  onPageShow(event:any){
    this.fsrv.restoreFromLocalStorage()
  }

  private onOpenFormSubscription: Subscription = new Subscription()
  private onCloseFormSubscription: Subscription = new Subscription()
  private onSwitchFormSubscription: Subscription = new Subscription()

  ngOnInit(): void {
    this.onOpenFormSubscription = this.fsrv.onOpenForm.subscribe(_=>{
      this.updateOpenedForms()
    })

    this.onCloseFormSubscription = this.fsrv.onCloseForm.subscribe(_=>{
      this.updateOpenedForms()
    })

    this.onSwitchFormSubscription = this.fsrv.onSwitchForm.subscribe(_=>{
      this.activeFormID = this.fsrv.getActiveFormID()
      this.tabSelectedIndex = this.forms.findIndex(i=> i.id === this.activeFormID && i.openingMode === FormOpeningMode.REGULAR)
    })

  }

  ngOnDestroy(): void {
    this.onOpenFormSubscription.unsubscribe()
    this.onCloseFormSubscription.unsubscribe()
    this.onSwitchFormSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toogleDrawer()
    }, 0)
  }

  private updateOpenedForms(){
    this.forms = this.fsrv.getForms().filter(i=> i.openingMode = FormOpeningMode.REGULAR)
    this.toogleDrawer()
  }

  private toogleDrawer(){
    if(this.drawer != undefined){
      if(this.forms.length > 0 && this.drawer.opened){
        this.drawer.close()
      }
      if(this.forms.length === 0 && ! this.drawer.opened){
        this.drawer.open()
      }
    }
  }

  onSelectedIndexChange(event:any){
    if(this.forms.length > 0){
      this.switchForm(this.forms[event])
    }
  }

  switchForm(formInfo:FormInfo){
    this.fsrv.switchForm(formInfo)
  }

  getTabTitle(formInfo:FormInfo):string{
    return formInfo.instance?.title === undefined ? '' : formInfo.instance.title
  }

  openList(metadataClassName:string){
    this.fsrv.openForm(Metadata.createInstance(metadataClassName).formProvider.getListForm(),
      FormOpeningMode.REGULAR)
  }
}
