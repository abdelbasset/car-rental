import { Component, OnInit } from '@angular/core';
import { Car } from './car.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

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

  constructor(private api: ApiService) { }
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

}
