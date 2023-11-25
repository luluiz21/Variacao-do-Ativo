import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { FinanceDataService } from 'src/app/core/services/finance-data.service';
import { Observable, of, throwError } from 'rxjs';
import { StockList } from 'src/app/models/stock-list.model';
import { Meta, StockData } from 'src/app/models/stock-data.model';
import { StockSelectorComponent } from '../stock-selector/stock-selector.component';
import { StockListComponent } from '../stock-list/stock-list.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let financeDataServiceSpy: jasmine.SpyObj<FinanceDataService>;

  beforeEach(async () => {
    // Criar um spy para o FinanceDataService
    const spy = jasmine.createSpyObj('FinanceDataService', ['getStockData']);

    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        StockSelectorComponent,
        StockListComponent,
        StockChartComponent
       ],
       imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: FinanceDataService, useValue: spy }
      ]
    })
    .compileComponents();

    financeDataServiceSpy = TestBed.inject(FinanceDataService) as jasmine.SpyObj<FinanceDataService>;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStockData and process data correctly', () => {
    const mockData: StockData = {
      chart: {
        result: [{
          meta: new Meta(),
          timestamp: [],
          indicators: {
            quote: [{
              open: [],
              low: [],
              close: [],
              high: [],
              volume: []
            }],
          }
        }],
        error: null
      }
    };
    // Crie um processedData baseado no mockData para testar o resultado de processStockData
    const processedData: StockList[] = mockData.chart.result[0].timestamp.map((time, index) => ({
      day: index + 1,
      date: '2023/10/11',
      value: mockData.chart.result[0].indicators.quote[0].open[index],
      variationFromPreviousDay: 10,
      variationFromFirstDay: 10
    }));
    financeDataServiceSpy.getStockData.and.returnValue(of(mockData));

    // Suppose _event is the stock symbol
    const _event = 'AAPL';
    component.getStockData(_event);
    fixture.detectChanges();

    expect(financeDataServiceSpy.getStockData.calls.any()).toBe(true, 'getStockData called');
    expect(component.stockList).toEqual(processedData);
  });

  it('should handle errors when getStockData fails', () => {
    const errorMsg = 'Error fetching stock data';
    financeDataServiceSpy.getStockData.and.returnValue(throwError(() => new Error(errorMsg)));

    component.getStockData('INVALID');

    expect(component.stockList).toEqual([]);
  });
});