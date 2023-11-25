import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockData } from 'src/app/models/stock-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceDataService {
  apiUrl = '/api/v8/finance/chart/';
  apiSearchUrl ='/apiv1/finance/search?q='

  constructor(private http: HttpClient) { }

  getStockData(symbol: string): Observable<StockData> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.http.get<StockData>(`${this.apiUrl}${symbol}`, httpOptions);
  }

  searchStocks(query: String): Observable<any> {
    
    return this.http.get<any>(`${this.apiSearchUrl}${query}`);
  }

}
