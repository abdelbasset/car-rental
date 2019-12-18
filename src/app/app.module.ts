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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule  
  ],
  providers: [UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
