import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripData
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Couldn't find tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripService.getTrip(tripCode).subscribe({
      next: (data: Trip[]) => {
        if (data && data.length > 0) {
          this.editForm.patchValue(data[0]);
        } else {
          alert('Trip not found');
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Error fetching trip:', err);
        alert('Error fetching trip');
        this.router.navigate(['']);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.editForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }

    const trip: Trip = this.editForm.value;

    if (!trip.code) {
      alert('Trip code is missing!');
      return;
    }

    this.tripService.updateTrip(trip).subscribe({
      next: (updatedTrip) => {
        console.log('Trip updated:', updatedTrip);
        this.router.navigate(['list-trips']);
      },
      error: (err) => {
        console.error('Error updating trip:', err);
        alert('Failed to update trip');
      }
    });
  }

  get f() {
    return this.editForm.controls;
  }
}
