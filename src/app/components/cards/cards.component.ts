import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IStoreItem} from "../../models/store";
import {StoreService} from "../../services/store.service";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})

export class CardsComponent {
  items: IStoreItem[] = []
  filteredItems: IStoreItem[] = [];
  itemsSubscription: Subscription = new Subscription()

  basket: IStoreItem[] = []
  basketSubscription: Subscription = new Subscription()

  inputText: string = ''

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.itemsSubscription = this.storeService.getStore().subscribe((data: IStoreItem[]) => {
      this.items = data
      this.filteredItems = data;
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

  search() {
    if (!this.inputText) {
      this.filteredItems = this.items
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.inputText.toLowerCase())
      );
    }
  }
}
