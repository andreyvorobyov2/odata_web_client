import { Directive, ViewContainerRef } from "@angular/core";


@Directive({ selector: '[DynamicContent]' })
export class DynamicContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
