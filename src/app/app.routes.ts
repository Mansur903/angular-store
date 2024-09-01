import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {BasketComponent} from "./pages/basket/basket.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'basket', component: BasketComponent, title: 'Basket' },
  { path: '**', component: NotFoundComponent, title: 'Not found' }
];
