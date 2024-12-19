import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url:string = 'http://localhost:3000/locations';
  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]>{  //cuando ponemos en una funcion funcion(): HousingLocation[] estamos especificando que va a retornar despues de los dos puntos
    // es por eso que podemos retornar housingLocationList por que la funcion espera q se retorne un array de tipo housingLocation;
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  async getHousingLocationsById(id: number): Promise<HousingLocation | undefined> { //en este caso la funcion retornara un solo objeto de tipo housingLocation por eso ya no es un array ademas 
    // que estamos usando undefined en caso de que pasen un id no existente.
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
    //en este caso usamos la funcion find para donde le pasamos la housingLocationList con el parametro de 
    //housingLocation en el cual sea igual al id que nos pasen. va a buscar el id de los housingLocation hasta el q haga match con el id que nos pasaron
    // probar this.housingLocationList[id]****************
  }
  submitApplication(firstName:string, lastName:string, email:string){
    console.log(`Application submitted by ${firstName} ${lastName} ${email}`);
    // En realidad debería hacer algo con estos datos, como guardarlos en una base de datos o enviar un email.
    // Aquí simplemente se imprime el mensaje de la solicitud de aplicación.
  }
}
