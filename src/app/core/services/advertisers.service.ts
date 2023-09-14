import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdvertisers } from '../DTO';
import { environment } from '../../../../environment';

interface IResponse {
  status: string;
}

@Injectable()
export default class AdvertisersService {
  private apiUrl = environment.apiUrl;
  private userId = environment.userId;

  constructor(private http: HttpClient) {}

  getAdvertisers() {
    return this.http.post<IAdvertisers[]>(`${this.apiUrl}/GetTestAdvertisers`, { userId: this.userId });
  }

  updateAdvertiser(profit: number, advertiserId: number) {
    return this.http.post<IResponse>(`${this.apiUrl}/UpdateTestAdvertiser`, {
      userId: this.userId,
      advertiserId,
      profit,
    });
  }
}
