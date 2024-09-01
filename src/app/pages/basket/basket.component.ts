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
  basketLengthSubscription: Subscription = new Subscription()

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.basketSubscription = this.storeService.getBasket().subscribe((data: IStoreItem[]) => {
      this.basket = data
    })

    this.storeService.basket$.subscribe((data) => this.basket = data)
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
    if (this.basketLengthSubscription) this.basketLengthSubscription.unsubscribe()
  }

  increaseCount(item: IStoreItem) {
    item.quantity += 1
    this.storeService.updateBasketItem(item).subscribe((data) => {})
  }

  decreaseCount(item: IStoreItem) {
    if (item.quantity === 1) {
      this.basket = this.basket.filter((basketItem) => basketItem.id !== item.id )
      this.storeService.deleteFromBasket(item).subscribe((data) => {})

      item.isInCart = false
      this.storeService.updateStoreItem(item).subscribe((data) => {})
    } else {
      item.quantity -= 1
      this.storeService.updateBasketItem(item).subscribe((data) => {})
    }
  }
}
