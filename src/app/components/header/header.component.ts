import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {IStoreItem} from "../../models/store";
import {Subscription} from "rxjs";
import {StoreService} from "../../services/store.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    RouterLink, CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  basketLength: number = 0

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getBasket().subscribe((data) => {
      console.log('basketLength: ', data.length)
      this.basketLength = data.length
    })

    this.storeService.basket$.subscribe((data) => this.basketLength = data.length)
  }
}
