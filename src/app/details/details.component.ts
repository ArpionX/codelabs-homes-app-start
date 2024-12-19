import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article class="listing-photo">
  <img [src]="housingLocation?.photo" alt="photo de cosa">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">about this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">apply now to live</h2>
      <form [formGroup]="applyform" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" formControlName="lastName">

        <label for="email">Email</label>
        <input type="text" id="email" formControlName="email">
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>

  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService:HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  }
    
  )
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']) ;
    this.housingService.getHousingLocationsById(housingLocationId).then(housingLocation =>{
      this.housingLocation = housingLocation;
    })
  }
  submitApplication(){
    this.housingService.submitApplication(
      this.applyform.value.firstName ?? '',
      this.applyform.value.lastName ?? '',
      this.applyform.value.email ?? ''
    )
  }
}
