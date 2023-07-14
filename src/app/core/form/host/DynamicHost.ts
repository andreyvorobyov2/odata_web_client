import { Directive, ViewChild } from "@angular/core";
import { FormService } from "../FormService";
import { DynamicContentDirective } from "./DynamicContentDirective";


@Directive({})
export class DynamicHost {
  @ViewChild(DynamicContentDirective, { static: true })
  protected DynamicHost!: DynamicContentDirective;
  constructor(protected formService: FormService) { }
}
