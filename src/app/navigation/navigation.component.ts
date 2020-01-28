import { Component, OnInit, OnDestroy, DoCheck, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.services';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UIService } from '../shared/ui.service';
import { MatSidenav } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy, DoCheck {
  //In component.ts
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  
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
    private uiService: UIService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.isAuth = true;
    }
    console.log(this.authService.isAuth());
  }

  ngDoCheck() {
    if (this.authService.isAuth()) {
      this.isAuth = true;
    }
    console.log(this.authService.isAuth());
  }

  ngOnDestroy() {
    this.isAuth = false;
    this.authSubscription.unsubscribe();
  }

  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

}
