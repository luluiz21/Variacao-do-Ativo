import { Component, OnInit } from '@angular/core';
import { FinanceDataService } from 'src/app/core/services/finance-data.service';
import { StockData } from 'src/app/models/stock-data.model';
import { StockList } from 'src/app/models/stock-list.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  stockList: StockList[] = [];
  recentTradeDaysCount: number = 30;
  

  constructor(
    private financeDataService: FinanceDataService
  ) { }



  getStockData(_event: string){
    
    this.financeDataService.getStockData(_event).subscribe(
      (data)=>{
        this.stockList = this.processStockData(data);  
      },
      (error)=>{
        this.stockList = [];
      }
    )
  }
  processStockData(data: StockData){
    let processedData: StockList[] = [];
    const timestamps = data.chart.result[0].timestamp;
    const opens = data.chart.result[0].indicators.quote[0].open;
    let lastTimeStamps = timestamps;
    let lastOpens = opens;
    if(timestamps.length > this.recentTradeDaysCount){
      lastTimeStamps = timestamps.slice(-this.recentTradeDaysCount);
      lastOpens = opens.slice(-this.recentTradeDaysCount);
    }
    

    let firstDayOpen = lastOpens[0]; // Valor de abertura do primeiro dia

    lastTimeStamps.forEach((timestamp, index) => {
      const date = new Date(timestamp * 1000); // Convertendo timestamp para objeto Date
      const open = lastOpens[index];

      // Variação em relação a D-1
      let variationFromPreviousDay = index === 0 ? 0 : ((open - lastOpens[index - 1]) / lastOpens[index - 1]) * 100;

      // Variação em relação à primeira data
      let variationFromFirstDay = ((open - firstDayOpen) / firstDayOpen) * 100;

      // Formatar os números para ter apenas duas casas decimais
      variationFromPreviousDay = variationFromPreviousDay ? parseFloat(variationFromPreviousDay.toFixed(2)) : 0;
      variationFromFirstDay = parseFloat(variationFromFirstDay.toFixed(2));
      const stringDate = `${date.toISOString().split('T')[0]} às ${date.toTimeString().split(' GMT')[0]}` 

      processedData.push({
        day: index + 1, // Dia começando em 1
        date: stringDate, // Data no formato YYYY-MM-DD e horário
        value: open, // Valor de abertura
        variationFromPreviousDay: variationFromPreviousDay, // Variação em relação a D-1
        variationFromFirstDay: variationFromFirstDay // Variação em relação à primeira data
      });
    });

  return processedData;
  }

}
