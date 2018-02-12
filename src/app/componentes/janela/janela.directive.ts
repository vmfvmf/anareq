import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[j-d]'
})
export class JanelaDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
