import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarsComponent } from './cars/cars.component';
import { MaterialModule } from './material.module';
import { UIService } from './shared/ui.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    CarsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider , UIService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
