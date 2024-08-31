import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IStore } from "../models/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/store'

  getStore() {
    return this.http.get<IStore[]>(this.url)
  }

  getStoreItem(id: number) {
    return this.http.get<IStore>(`${this.url}/${id}`)
  }
}
