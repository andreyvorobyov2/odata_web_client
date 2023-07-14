import { Type, ViewRef } from "@angular/core";
import { IFormDefinition } from "./IFormDefinition";
import { IForm } from "./IForm";
import { IMetadata } from "../metadata/IMetadata";
import { CommandPanelVariant, FormOpeningMode, FormType } from "./Form";


export class FormInfo {
  public viewRef: ViewRef[] = [];
  public component: Type<IForm>;
  public md: IMetadata
  public formType: FormType
  public instance: IForm | undefined;
  public params: any = {};
  public commandPanelVariant: CommandPanelVariant = CommandPanelVariant.DEFAULT;

  constructor(formDefinition: IFormDefinition,
    public id: number,
    public openingMode: FormOpeningMode) {

    this.component = formDefinition.component;
    this.md = formDefinition.md;
    this.formType = formDefinition.formType
  }
}
