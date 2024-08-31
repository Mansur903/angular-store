import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IStoreItem } from "../models/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/store'
  urlBasket: string = 'http://localhost:3000/basket'

  getStore() {
    return this.http.get<IStoreItem[]>(this.url)
  }

  getStoreItem(id: number) {
    return this.http.get<IStoreItem>(`${this.url}/${id}`)
  }

  addToBasket(item: IStoreItem) {
    return this.http.post<IStoreItem>(this.urlBasket, item)
  }

  getBasket() {
    return this.http.get<IStoreItem[]>(this.urlBasket)
  }

  updateBasketItem(item: IStoreItem) {
    return this.http.put<IStoreItem>(`${this.urlBasket}/${item.id}`, item)
  }
}
