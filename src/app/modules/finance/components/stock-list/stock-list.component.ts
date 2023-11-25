import { Component, Input, OnInit } from '@angular/core';
import { StockList } from 'src/app/models/stock-list.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent  {
  @Input() stocks: StockList[] = [];

}
