import { OnInit, ViewContainerRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


@Directive({ //this is structure directive so we will use the staric keyword with it when to use,
  selector: '[appHasRole]' //*appHasRole
})
export class HasRoleDirective implements OnInit {
  //Creating our own structure Directives

  @Input() appHasRole: string[];
  isVisible = false;

  constructor(private _authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

    ngOnInit(): void {

      // this method call those u use the appHasDirective in the anchor tag

      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      const userRoles = this._authService.decode as Array<string>;
      if(!userRoles){
        this.viewContainerRef.clear();
      }

      if(this._authService.roleMatch(this.appHasRole)) {
        if(!this.isVisible){
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else{
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }


    }


}
