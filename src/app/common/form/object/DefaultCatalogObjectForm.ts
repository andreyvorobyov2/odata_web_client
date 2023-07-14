
import { Component } from "@angular/core";
import { DefaultObjectForm } from "./DefaultObjectForm";
import { CatalogObjectForm } from "src/app/core/form/datasource.form/object.form/CatalogObjectForm";


@Component({
  templateUrl:'./default.edit.object.html',
  styleUrls:['./default.object.css'],
})
export class DefaultCatalogObjectForm extends CatalogObjectForm{
  override title: string = 'default.catalog.object.form.ts'


  wrapper: DefaultObjectForm = new DefaultObjectForm()

  override onCreateForm(): void {
    super.onCreateForm()
    this.wrapper.attributes = this.md.attributes === undefined ? [] : this.md.attributes

    if(this.isNew()){
      this.wrapper.setDataSource(this.dataSource)
    }
  }

  protected override onDataFetched(): void {
    super.onDataFetched()
    this.wrapper.setDataSource(this.dataSource)
  }
}
