import { Type } from "@angular/core";
import { IForm } from "../form/IForm";
import { IListForm } from "src/app/core/form/datasource.form/list.form/IListForm";
import { IObjectForm } from "src/app/core/form/datasource.form/object.form/IObjectForm";

export interface IClassResolver {
  metadataClassName:string

  objectClass?: any
  listClass?: any;

  requestBuilderClass?: any
  odataResource?: string

  listForm?: Type<IListForm>
  objectForm?: Type<IObjectForm>

  rowForm?: Type<IForm>
}
