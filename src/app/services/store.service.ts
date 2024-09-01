import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IStoreItem } from "../models/store";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {
    this.loadInitialBasket()
  }

  url: string = 'http://localhost:3000/store'
  urlBasket: string = 'http://localhost:3000/basket'

  private basketSubject: BehaviorSubject<IStoreItem[]> = new BehaviorSubject<IStoreItem[]>([]);
  basket$ = this.basketSubject.asObservable();

  private loadInitialBasket() {
    this.http.get<IStoreItem[]>(this.urlBasket).subscribe(basket => {
      this.basketSubject.next(basket);
    });
  }

  getStore() {
    return this.http.get<IStoreItem[]>(this.url)
  }

  getStoreItem(id: number) {
    return this.http.get<IStoreItem>(`${this.url}/${id}`)
  }

  updateStoreItem(item: IStoreItem) {
    return this.http.put<IStoreItem>(`${this.url}/${item.id}`, item)
  }

  addToBasket(item: IStoreItem) {
    const currentBasket = this.basketSubject.value;
    this.basketSubject.next([...currentBasket, item]);

    return this.http.post<IStoreItem>(this.urlBasket, item)
  }

  getBasket() {
    return this.http.get<IStoreItem[]>(this.urlBasket)
  }

  updateBasketItem(item: IStoreItem) {
    return this.http.put<IStoreItem>(`${this.urlBasket}/${item.id}`, item)
  }

  deleteFromBasket(item: IStoreItem) {
    const newDataBasket = this.basketSubject.value.filter((basketItem) => basketItem.id !== item.id)
    this.basketSubject.next([...newDataBasket]);

    return this.http.delete<IStoreItem>(`${this.urlBasket}/${item.id}`)
  }
}
