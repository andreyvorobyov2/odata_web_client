
import { RequestBuilder } from "../../../../core/data/request.builder/RequestBuilder";
import { Customers_CatalogListForm } from "./list.form";
import { Customers_CatalogObjectForm } from "./object.form";
import { Metadata } from "../../../../core/metadata/Metadata";
import { IClassResolver } from "../../../../core/metadata/IClassResolver";
import { EmptyListEntity } from "src/app/core/data/entity/list.entity/EmptyListEntity";
import { EmptyObjectEntity } from "src/app/core/data/entity/object.entity/EmptyObjectEntity";


export class Customers_Md extends Metadata{

  protected override resolveClasses(): IClassResolver {
    return {

      metadataClassName: Customers_Md.name,

      objectClass: EmptyObjectEntity,
      listClass: EmptyListEntity,

      listForm: Customers_CatalogListForm,
      objectForm: Customers_CatalogObjectForm,

      requestBuilderClass: RequestBuilder,
      odataResource: 'Catalog_Customers'
    }
  }

  constructor(){
    super()
    this.primary_key = 'Ref_Key'
    this.presentation = 'Description'

    this.attributes = [
      {dataPath:'Code'},
      {dataPath:'BirthDate'},
      {dataPath:'Email'},
      {dataPath:'Address'},
      {dataPath:'City'},
      {dataPath:'PostalCode'},

      {
        dataPath: 'Description',
        showInList: true,
        columnTitle: 'Customer name'
      },
      {
        dataPath: 'Phone',
        showInList: true,
        columnTitle: 'Phone'
      }
    ]

  }
}
