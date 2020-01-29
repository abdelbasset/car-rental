import { Component, OnInit } from '@angular/core';
import { CarServices } from '../../_services/cars.services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-detail-car',
  templateUrl: './detail-car.component.html',
  styleUrls: ['./detail-car.component.scss']
})
export class DetailCarComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  car;
  updateForm = new FormGroup({
    name_car: new FormControl('', Validators.required),
    desc_car: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    picture: new FormControl(),
  });

  constructor(private carService: CarServices, private route: ActivatedRoute, private location: Location, private _formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.getCar();
    
  }

  getCar(): void {
    
    this.carService.getCarById(this.id)
      .subscribe(details => {
        this.car = details;
        this.updateForm.patchValue({
          name_car: details.name_car,
          desc_car: details.desc_car,
          price: details.price,
          picture: details.picture
        });
        //this.updateForm.patchValue({sectionContent: details.desc_car});
      });
  }

  save() {
    console.log(this.updateForm.value);

    this.carService.updateCar(this.id, this.updateForm.value).subscribe(res => console.log(res))
  }

  goBack(): void {
    this.location.back();
  }
}