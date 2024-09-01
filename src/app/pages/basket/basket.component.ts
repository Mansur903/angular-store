import {Component, OnInit} from '@angular/core';
import {IStoreItem} from "../../models/store";
import {StoreService} from "../../services/store.service";
import {Subscription} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basket: IStoreItem[] = []
  basketSubscription: Subscription = new Subscription()
  basketLengthSubscription: Subscription = new Subscription()

  totalCost: number = 0

  inputText: string = ''
  filteredItems: IStoreItem[] = []

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.basketSubscription = this.storeService.getBasket().subscribe((data: IStoreItem[]) => {
      this.basket = data
      this.filteredItems = data
      this.countTotalCost(data)
    })

    this.storeService.basket$.subscribe((data) => this.basket = data)
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
    if (this.basketLengthSubscription) this.basketLengthSubscription.unsubscribe()
  }

  increaseCount(item: IStoreItem) {
    item.quantity += 1
    this.totalCost += item.price
    this.storeService.updateBasketItem(item).subscribe((data) => {})
  }

  decreaseCount(item: IStoreItem) {
    this.totalCost -= item.price
    if (item.quantity === 1) {
      this.basket = this.basket.filter((basketItem) => basketItem.id !== item.id )
      this.filteredItems = [...this.basket]
      this.storeService.deleteFromBasket(item).subscribe((data) => {})

      item.isInCart = false
      this.storeService.updateStoreItem(item).subscribe((data) => {})
    } else {
      item.quantity -= 1
      this.storeService.updateBasketItem(item).subscribe((data) => {})
    }
  }

  countTotalCost(data: IStoreItem[]) {
    this.totalCost = data.reduce((acc, item:IStoreItem) => acc += item.price * item.quantity, 0)
  }

  search() {
    if (!this.inputText) {
      this.filteredItems = this.basket
    } else {
      this.filteredItems = this.basket.filter(item =>
        item.name.toLowerCase().includes(this.inputText.toLowerCase())
      );
    }
  }
}
