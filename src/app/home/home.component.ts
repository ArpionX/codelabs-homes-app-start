import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter (keyup)="filterResult(filter.value)"/>
      <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
  <app-housing-location *ngFor="let locationCasas of filteredLocationList" [housingLocation]="locationCasas"/>
  </section>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  filteredLocationList:HousingLocation[]=[];
  housingLocationList: HousingLocation[]=[];
  housingService: HousingService  = inject(HousingService);
  constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList:HousingLocation[])=>{
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })
  }
  filterResult(text:string){
    if(!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    )
  }
}

