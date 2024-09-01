import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IStoreItem} from "../../models/store";
import {StoreService} from "../../services/store.service";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, CommonModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})

export class CardsComponent implements OnInit {
  items: IStoreItem[] = []
  itemsSubscription: Subscription = new Subscription()

  basket: IStoreItem[] = []
  basketSubscription: Subscription = new Subscription()

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.itemsSubscription = this.storeService.getStore().subscribe((data: IStoreItem[]) => {
      this.items = data
    })

    this.basketSubscription = this.storeService.getBasket().subscribe((data) => {
      this.basket = data
    })
  }

  ngOnDestroy() {
    if (this.itemsSubscription) this.itemsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  addToBasket(item: IStoreItem) {
    item.isInCart = true
    this.storeService.updateStoreItem(item).subscribe((data) => {})

    item.quantity = 1
    this.postBasket(item);
  }

  postBasket(item: IStoreItem) {
    this.storeService.addToBasket(item).subscribe((data) => this.basket.push(data))
  }

  updateBasket(item: IStoreItem) {
    item.quantity += 1
    this.storeService.updateBasketItem(item).subscribe((data) => {})
  }
}
