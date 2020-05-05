import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationModule } from './configuration/configuration.modules';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfigurationModule,
    SharedModule,
    AdminModule,
    UIModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  schemas: [  ],  
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
