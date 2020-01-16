import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ClientsComponent } from './clients/clients.component';
import { NewslettersComponent } from './newsletters/newsletters.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'newsletters', component: NewslettersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
