import { Directive } from "@angular/core";
import { AbstractObjectForm } from "src/app/core/form/datasource.form/object.form/AbstractObjectForm";
import { CommandPanelVariant } from "src/app/core/form/Form";


@Directive({})
export abstract class DocumentObjectForm extends AbstractObjectForm {
  override getCommandPanelVariant(): CommandPanelVariant {
    return CommandPanelVariant.DOCUMENT_OBJECT_FORM;
  }
}
