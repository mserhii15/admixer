import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdvertisers } from '../DTO';

interface IResponse {
  status: string;
}

@Injectable()
export default class AdvertisersService {
  private proxyUrl = "https://cors-anywhere.herokuapp.com/";
  private apiUrl = "http://integration-api-stage.admixer.net/TestTask";
  private userId: number = 1124;

  constructor(private http: HttpClient) {}

  getAdvertisers() {
    return this.http.post<IAdvertisers[]>('http://localhost:3000/TestTask/GetTestAdvertisers', { userId: this.userId });
  }

  updateAdvertiser(profit: number, advertiserId: number) {
    return this.http.post<IResponse>(`${this.apiUrl}/UpdateTestAdvertiser`, {
      userId: this.userId,
      advertiserId,
      profit,
    });
  }
}
