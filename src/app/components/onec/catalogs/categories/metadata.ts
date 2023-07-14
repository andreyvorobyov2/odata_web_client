
import { RequestBuilder } from "../../../../core/data/request.builder/RequestBuilder";
import { Metadata } from "../../../../core/metadata/Metadata";
import { IClassResolver } from "../../../../core/metadata/IClassResolver";
import { ControlTypes } from "src/app/common/form/controls/controls";
import { DefaultListForm } from "src/app/common/form/list/default.list";
import { EmptyListEntity } from "src/app/core/data/entity/list.entity/EmptyListEntity";
import { DefaultCatalogObjectForm } from "src/app/common/form/object/DefaultCatalogObjectForm";
import { EmptyObjectEntity } from "src/app/core/data/entity/object.entity/EmptyObjectEntity";


export class Categories_Md extends Metadata{
  protected override resolveClasses(): IClassResolver {
    return {

      metadataClassName: Categories_Md.name,

      objectClass: EmptyObjectEntity,
      listClass: EmptyListEntity,

      listForm: DefaultListForm,
      objectForm: DefaultCatalogObjectForm,

      requestBuilderClass: RequestBuilder,
      odataResource: 'Catalog_Categories'
    }
  }

  constructor(){
    super()
    this.primary_key = 'Ref_Key'
    this.presentation = 'Description'

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
          control:{title: 'Description', inputType: 'text', maxLength: 20}
        }
      }
    ]


  }
}
