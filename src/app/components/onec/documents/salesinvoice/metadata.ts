
import { RequestBuilder } from "../../../../core/data/request.builder/RequestBuilder";
import { SalesInvoice_DocumentObjectForm } from "./object.form";
import { Metadata,  } from "../../../../core/metadata/Metadata";
import { IClassResolver } from "../../../../core/metadata/IClassResolver";
import { DefaultListForm } from "src/app/common/form/list/default.list";
import { EmptyListEntity } from "src/app/core/data/entity/list.entity/EmptyListEntity";
import { IForeignField, ITabularSection } from "src/app/core/metadata/IMetadata";
import { ControlTypes } from "src/app/common/form/controls/controls";
import { EmptyObjectEntity } from "src/app/core/data/entity/object.entity/EmptyObjectEntity";
import { DefaultTabularSectionRowForm } from "src/app/common/form/controls/DefaultTabularSectionRowForm";
import { Customers_Md } from "../../catalogs/customers/metadata";
import { Goods_Md } from "../../catalogs/goods/metadata";


export class SalesInvoice_Md extends Metadata {

  protected override resolveClasses(): IClassResolver {
    return {
      metadataClassName: SalesInvoice_Md.name,

      objectClass: EmptyObjectEntity,
      listClass: EmptyListEntity,

      listForm: DefaultListForm,
      objectForm: SalesInvoice_DocumentObjectForm,


      requestBuilderClass: RequestBuilder,
      odataResource: 'Document_SalesInvoice'
    }
  }

  // foreign field: Customer
  readonly FK_Customer:IForeignField = {
    property_name:'Customer',
    md: Metadata.createInstance(Customers_Md.name)
  }

  // tabular section: Products
  products_metadata:ProductsRow_Md = Metadata.createInstance(ProductsRow_Md.name) as ProductsRow_Md
  readonly TS_Products:ITabularSection = {
    name:'Products',
    table_md: this.products_metadata,
    columns:['LineNumber', 'Price', 'Quantity', 'Total'],
    foreignColumns: [this.products_metadata.FK_Goods]
  }

  constructor(){
    super()
    this.primary_key = 'Ref_Key'
    this.presentation = 'Ref_Key'

    this.foreign_keys.set(this.FK_Customer.property_name, this.FK_Customer)

    this.tabular_sections = [this.TS_Products]

    this.attributes = [
      {dataPath:'Number', showInList: true, columnTitle:'Number'},
      {dataPath:'Date', showInList: true, columnTitle:'Date'},
      {dataPath:this.FK_Customer.property_name, foreignField:this.FK_Customer, showInList: true, columnTitle:'Customer'}
    ]

  }

}


export class ProductsRow_Md extends Metadata{

  protected override resolveClasses(): IClassResolver {
    return {
      metadataClassName:ProductsRow_Md.name,

      objectClass: EmptyObjectEntity,

      rowForm: DefaultTabularSectionRowForm,

      requestBuilderClass: RequestBuilder,
      odataResource: 'Document_SalesInvoice_Products'
    }
  }

  readonly FK_Goods:IForeignField =
  {property_name:'Goods', md: Metadata.createInstance(Goods_Md.name)}

  constructor(){
    super()
    this.foreign_keys.set('Goods', this.FK_Goods)

    this.attributes = [
      {
        dataPath: 'LineNumber',
        formControl:{
          controlType:ControlTypes.Label,
          control:{title: '#'}
        }
      },
      {
        dataPath: this.FK_Goods.property_name,
        foreignField:this.FK_Goods,
        formControl:{
          controlType: ControlTypes.ReferenceInput,
          control:{title:'Goods'}
        }
      },
      {
        dataPath: 'Price',
        formControl:{
          controlType: ControlTypes.Input,
          control:{title:'Price', inputType: 'number'}
        }
      },
      {
        dataPath: 'Quantity',
        formControl:{
          controlType: ControlTypes.Input,
          control:{title:'Quantity', inputType: 'number'}
        }
      },
      {
        dataPath: 'Total',
        formControl:{
          controlType: ControlTypes.Input,
          control:{title:'Total', inputType: 'number'}
        }
      },
    ]
  }
}
