import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {IStore} from "../../models/store";
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
export class CardsComponent implements OnInit{
  items: IStore[] = []
  itemsSubscription: Subscription = new Subscription()

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getStore().subscribe((data: IStore[]) => {
      this.items = data
    })
  }

  ngOnDestroy() {
    if (this.itemsSubscription) this.itemsSubscription.unsubscribe()
  }
}
