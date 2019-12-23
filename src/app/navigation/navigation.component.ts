import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.services';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy{
  currentUser: User;
  loading = true;
  users: User[];
  isAuth = false;
  authSubscription: Subscription;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      private breakpointObserver: BreakpointObserver, 
      private authService: AuthService, 
      private router: Router,
      ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
      }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }
  
  ngOnInit(){
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      console.log(authStatus);
    });
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
