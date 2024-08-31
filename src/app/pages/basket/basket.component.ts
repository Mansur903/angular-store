import {Component, OnInit} from '@angular/core';
import {IStoreItem} from "../../models/store";
import {StoreService} from "../../services/store.service";
import {Subscription} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, CommonModule
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basket: IStoreItem[] = []
  basketSubscription: Subscription = new Subscription()

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.basketSubscription = this.storeService.getBasket().subscribe((data: IStoreItem[]) => {
      this.basket = data
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
