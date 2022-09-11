import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/Modules/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/auth/auth-interceptor.service';
import { SearchProductComponent } from './client/search-product/search-product.component';
import { FooterComponent } from './client/footer/footer.component';
import { ContactUsComponent } from './client/footer/contact-us/contact-us.component';
import { NavbarModule } from './client/navbar/navbar.module';
import { FooterModule } from './client/footer/footer.module';
import { AboutUsComponent } from './client/footer/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NavbarModule,
    FooterModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
