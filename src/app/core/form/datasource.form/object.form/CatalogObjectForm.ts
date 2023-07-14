import { Directive } from "@angular/core";
import { AbstractObjectForm } from "src/app/core/form/datasource.form/object.form/AbstractObjectForm";
import { CommandPanelVariant } from "src/app/core/form/Form";


@Directive({})
export abstract class CatalogObjectForm extends AbstractObjectForm {
  override getCommandPanelVariant(): CommandPanelVariant {
    return CommandPanelVariant.CATALOG_OBJECT_FORM;
  }
}
