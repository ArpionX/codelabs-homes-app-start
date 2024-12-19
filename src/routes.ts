import { Routes } from "@angular/router";
import { DetailsComponent } from "./app/details/details.component";
import { HomeComponent } from "./app/home/home.component";
const routeConfig:Routes=[
    {
        path:'',
        component: HomeComponent,
        title:'Home Page'
    },
    {
        path:'details/:id',
        component: DetailsComponent,
        title:'Details Page'
    }
];
export default routeConfig