import { Component } from "@angular/core";
import { CatalogObjectForm } from "src/app/core/form/datasource.form/object.form/CatalogObjectForm";


@Component({
  templateUrl:'./object.form.html',
  styleUrls:['../../object.form.css']
})
export class Customers_CatalogObjectForm extends CatalogObjectForm{
  override title: string = ''

  protected override onDataFetched(){
    super.onDataFetched()
    this.title = 'Customer: ' + this.dataSource.data.Description
  }
}


