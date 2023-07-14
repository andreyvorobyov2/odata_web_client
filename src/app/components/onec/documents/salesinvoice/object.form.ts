import { Component } from "@angular/core";
import { IReferenceFormControl } from "src/app/common/form/controls/reference";
import { SalesInvoice_Md } from "./metadata";
import { ITabularSectionFormControl } from "src/app/common/form/controls/ITabularSectionFormControl";
import { DocumentObjectForm } from "src/app/core/form/datasource.form/object.form/DocumentObjectForm";


@Component({
  templateUrl:'./object.form.html',
  styleUrls:['../../object.form.css',],
})
export class SalesInvoice_DocumentObjectForm extends DocumentObjectForm{
  override title: string = ''

  // reference field: Customer
  customer:IReferenceFormControl|undefined
  panel_customer_tite:string = ''
  onCustomerPresentationChanged(presentation:string){
    setTimeout(() => {
      this.panel_customer_tite = presentation
    }, 0)
  }

  override onCreateForm(): void {
    super.onCreateForm()
    if(this.isNew()){
      this.onDataFetched()
    }
  }

  // tabular section: Products
  products: ITabularSectionFormControl|undefined

  protected override onDataFetched(): void {
    super.onDataFetched()
    this.initForm()
  }

  private initForm(){
    const _md = (this.md as SalesInvoice_Md)

    const data = this.dataSource.data
    this.title = `SI: ${data.Number} at: ${data.Date}`

    // link form controls to data

    this.customer = {
      owner_data: this.dataSource.data,
      fk_field: _md.FK_Customer
    }

    this.products = {
      owner: this,
      tabular_section: _md.TS_Products,
      columns_to_display:[

        {title:'#', dataPath:'LineNumber'},
        {title:'Goods', dataPath:'Goods'}, // foreign field
        {title:'Price', dataPath:'Price'},
        {title:'Quantity', dataPath:'Quantity'},
        {title:'Total', dataPath:'Total'},
      ]

    }
  }

}
