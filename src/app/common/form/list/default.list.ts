import { Component } from "@angular/core";
import { ListForm } from "../../../core/form/datasource.form/list.form/ListForm";


@Component({
  templateUrl:'./list.form.html',
  styleUrls:['./list.form.css']
})
export class DefaultListForm extends ListForm{
  override title: string = 'default.list.ts'

  override pageSize: number = 10

}
