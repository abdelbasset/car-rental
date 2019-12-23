import { Component } from '@angular/core';
import { AuthService } from './_services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-rental';

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.initAuthListener();
  }

  
}
