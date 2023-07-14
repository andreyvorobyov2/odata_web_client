import { Component } from "@angular/core";
import { ListForm } from "src/app/core/form/datasource.form/list.form/ListForm";


@Component({
  templateUrl: '../../../../common/form/list/list.form.html',
  styleUrls:['../../../../common/form/list/list.form.css']
})
export class Customers_CatalogListForm extends ListForm{
  override title: string = 'Catalog:Customers'
  override pageSize:number = 10
}



