import { Component, OnInit } from '@angular/core';
import { CarServices } from '../../_services/cars.services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-car',
  templateUrl: './detail-car.component.html',
  styleUrls: ['./detail-car.component.scss']
})
export class DetailCarComponent implements OnInit {
  car;

  constructor(private carService: CarServices, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carService.getCarById(id)
      .subscribe(details => this.car = details);
  }

  goBack(): void {
    this.location.back();
  }
}