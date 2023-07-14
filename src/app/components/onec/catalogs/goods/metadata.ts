

import { RequestBuilder } from "../../../../core/data/request.builder/RequestBuilder";
import { Metadata } from "../../../../core/metadata/Metadata";
import { IClassResolver } from "../../../../core/metadata/IClassResolver";
import { ControlTypes } from "src/app/common/form/controls/controls";
import { DefaultListForm } from "src/app/common/form/list/default.list";
import { EmptyListEntity } from "src/app/core/data/entity/list.entity/EmptyListEntity";
import { IForeignField } from "src/app/core/metadata/IMetadata";
import { DefaultCatalogObjectForm } from "src/app/common/form/object/DefaultCatalogObjectForm";
import { EmptyObjectEntity } from "src/app/core/data/entity/object.entity/EmptyObjectEntity";
import { Categories_Md } from "../categories/metadata";


export class Goods_Md extends Metadata{

  protected override resolveClasses(): IClassResolver {
    return {

      metadataClassName: Goods_Md.name,

      objectClass: EmptyObjectEntity,
      listClass: EmptyListEntity,

      listForm: DefaultListForm,
      objectForm: DefaultCatalogObjectForm,

      requestBuilderClass: RequestBuilder,
      odataResource: 'Catalog_Goods'
    }
  }

  readonly FK_Category:IForeignField = {
    property_name:'Category',
    md:  Metadata.createInstance(Categories_Md.name)
  }

  constructor(){
    super()
    this.primary_key = 'Ref_Key'
    this.presentation = 'Description'
    this.foreign_keys.set(this.FK_Category.property_name, this.FK_Category)

    this.attributes = [
      {
        dataPath: 'Code',
        showInList: true,
        columnTitle: 'Code',
        formControl: {
          controlType: ControlTypes.Label,
          control: {title: 'Code'}
        }
      },
      {
        dataPath: 'Description',
        showInList: true,
        columnTitle: 'Description',
        formControl: {
          controlType: ControlTypes.Input,
          control:{title: 'Description', inputType:'text', maxLength: 10}
        }
      },
      {
        dataPath: 'Price',
        showInList: true,
        columnTitle: 'Price',
        formControl: {
          controlType: ControlTypes.Input,
          control:{title: 'Price', inputType: 'number'}
        }
      },
      {
        dataPath: this.FK_Category.property_name,
        foreignField: this.FK_Category,
        showInList: true,
        columnTitle: 'Category',
        formControl: {
          controlType : ControlTypes.ReferenceInput,
          control: {title: 'Category'}
        }
      },
      {
        dataPath: 'Overview',
        formControl: {
          controlType: ControlTypes.Input,
          control:{title: 'Overview', inputType: 'text', maxLength:30, multiline:true}
        }
      },
    ]

  }

}

