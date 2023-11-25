import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StockList } from 'src/app/models/stock-list.model';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit, OnChanges {

  @Input() stockData: StockList[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] =  {
    datasets: [], // Inicialmente não há datasets
    labels: [] // Inicialmente não há labels
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true, 
  };
  public lineChartLegend = true;

  constructor() {}

  ngOnInit(): void {
    this.initChartData();
  }

  ngOnChanges(): void {
    this.initChartData();
  }

  initChartData(): void {
    const filteredData = this.stockData.filter(sd => sd.value !== null);
    if (this.stockData) {
      this.lineChartData = {
        labels: filteredData.map(sd => sd.date),
        datasets: [
          {
            data: filteredData.map(sd => sd.value ?? null),
            label: 'Preço de Abertura',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(0, 123, 255, 0.3)'
          },
        ]
      };
    }
  }
}
