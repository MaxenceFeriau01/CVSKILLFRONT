import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
@Directive({
  selector: '[appHasRights]'
})
export class HasRightDirective {

  permissions!: string[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
) { }

@Input() set hasRights(permissions: Array<string>) { 
  this.isGrantedWithOneAtLeast(permissions);
}
private isGrantedWithOneAtLeast(permissions: string[]) { 
  if (this.authenticationService.isGrantedWithOneAtLeast(permissions)) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainer.clear();
  }
}

}
