import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCardComponent } from '../trip-card/trip-card';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripData]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripData: TripData, private router: Router, private authenticationService: AuthenticationService) {
    console.log('TripListingComponent constructor');
   } 

   public addTrip(): void {
    this.router.navigate(['add-trip']);
   }

   private getTrips(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          console.log('API response:', value);
          this.trips = value;
          if(value.length > 0)
          {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retireved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
   }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();
    
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }
}
