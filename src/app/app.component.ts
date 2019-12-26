import { Component } from '@angular/core';
import { AuthService } from './_services/auth.services';
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { Car } from './_models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-rental';
  private newCar: Car;
  constructor(private authService: AuthService, private apiService: ApiService){}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
