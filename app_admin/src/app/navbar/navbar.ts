import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  /** Check if the user is currently logged in */
  public isLoggedIn(): boolean {
    try {
      return this.authenticationService.isLoggedIn();
    } catch (e) {
      console.error('Error checking login status:', e);
      return false;
    }
  }

  /** Log the user out */
  public onLogout(): void {
    try {
      this.authenticationService.logout();
    } catch (e) {
      console.error('Error logging out:', e);
    }
  }
}
