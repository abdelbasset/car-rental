import { Component, OnInit } from '@angular/core';
import { Car } from '../_models/car';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthService } from '../_services/auth.services';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  headers: string[];
  spresp: any;
  postdata: Car;
  authSubscription: Subscription;
  isAuth = false;

  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getCars();
    
  }

  getCars() {
    this.api.getCars()
      .subscribe(data => {
        for (let car of data) {
          this.cars.push(car);
        }
      });
  }

  getCarById(id: any) {
    this.api.getCarById(id)
      .subscribe(data => {
        console.log(data);
      });
  }

  
  addCar() {
    this.api
      .addCar(this.postdata)
      .subscribe(resp => {
        return this.spresp.push(resp);
      });
  }

  updateCar(id: any) {
    this.api
      .updateCar(id, this.postdata)
      .subscribe(resp => {
        return this.spresp.push(resp);
      });
   }

   deleteCar(id: any) {
    this.api
      .deleteCar(id, this.postdata)
      .subscribe(resp => {
        return this.spresp.push(resp);
      });
  }

  onSubmit(f: NgForm) {
    
     console.log(f.value);  
    this.postdata = {
      id_car: "546",
      name_car: f.value.name_car,
      registration: f.value.registration_car,
      price: f.value.price_car,
      picture: f.value.photo_car
    }; 
    this.api
      .addCar(this.postdata)
      .subscribe(resp => {
        console.log(resp);  
        return this.spresp.push(resp);
      });
  }

}
