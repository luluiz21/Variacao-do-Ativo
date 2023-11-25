import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { FinanceDataService } from 'src/app/core/services/finance-data.service';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.css']
})
export class StockSelectorComponent {

  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @Output() stockSelected = new EventEmitter<string>();
  @Output() searchClicked = new EventEmitter<string>();

  constructor(private financeService: FinanceDataService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Espera por 300ms após parar de digitar para chamar a API
      switchMap(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): Observable<string[]> {
    // Chama a API para obter as opções baseadas no que foi digitado
    if (value.length < 2) { // Evita chamar a API para strings muito curtas
      return of([]);
    }
    return this.financeService.searchStocks(value).pipe(
      map(response => response.quotes.map((stock: { symbol: string; }) => stock.symbol)) // Supondo que a API retorna um array de objetos com um 'symbol'
    );
  }

  onOptionSelected(event: any): void {
    const stockSymbol = event.option.value;
    this.stockSelected.emit(stockSymbol);
    this.searchControl.setValue(stockSymbol, { emitEvent: false });
    this.onSearchClick();
  }
  onSearchClick(): void {
    const currentValue = this.searchControl.value;
    this.searchClicked.emit(currentValue);
  }

}
