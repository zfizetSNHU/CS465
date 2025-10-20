import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListingComponent } from './trip-listing/trip-listing';
import { EditTripComponent } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';

export const routes: Routes = [
    {path: 'add-trip', component: AddTrip},
    {path: 'edit-trip', component: EditTripComponent},
    {path: 'login', component: LoginComponent},
    { path: '', component: TripListingComponent, pathMatch: 'full'}
];
