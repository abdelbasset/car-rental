import { Component } from '@angular/core';
import { AuthService } from './_services/auth.services';
import { ApiService } from './api.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-rental';
  currentUser: User;
  isAuth = false;
  constructor(
    private authService: AuthService, 
    private apiService: ApiService){}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
