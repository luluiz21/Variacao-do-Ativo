import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockChartComponent } from './stock-chart.component';
import { ChartConfiguration, ChartType } from 'chart.js';
import { StockList } from 'src/app/models/stock-list.model';
import { MatIconModule } from '@angular/material/icon';

describe('StockChartComponent', () => {
  let component: StockChartComponent;
  let fixture: ComponentFixture<StockChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockChartComponent],
      imports: [MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StockChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initChartData should set lineChartData correctly', () => {
    const mockStockData: StockList[] = [
      { day: 1, date: '2023-01-01 às 02:41', value: 100, variationFromPreviousDay: 0, variationFromFirstDay: 0 },
      { day: 2, date: '2023-01-01 às 02:42', value: 101, variationFromPreviousDay: 0.1, variationFromFirstDay: 0.1 },
      { day: 3, date: '2023-01-01 às 02:43', value: 102, variationFromPreviousDay: 0.2, variationFromFirstDay: 0.1 },
      { day: 4, date: '2023-01-01 às 02:44', value: 103, variationFromPreviousDay: 0.2, variationFromFirstDay: 0.1 }
    ];

    component.stockData = mockStockData;
    component.initChartData();

    // Testar se labels foram definidas corretamente
    expect(component?.lineChartData?.labels?.length).toBe(mockStockData.length);
    expect(component.lineChartData.labels).toEqual(mockStockData.map(sd => sd.date));

    // Testar se datasets foram definidos corretamente
    expect(component.lineChartData.datasets[0].data.length).toBe(mockStockData.length);
    expect(component.lineChartData.datasets[0].data).toEqual(mockStockData.map(sd => sd.value || null));
  });

  it('should update chart data when stockData changes', () => {
    const mockInitialData: StockList[] = [
      { day: 1, date: '2023-01-01 às 02:41', value: 100, variationFromPreviousDay: 0, variationFromFirstDay: 0.1 },
      { day: 2, date: '2023-01-01 às 02:42', value: 101, variationFromPreviousDay: 0.1, variationFromFirstDay: 0.1 },
      { day: 3, date: '2023-01-01 às 02:43', value: 102, variationFromPreviousDay: 0.2, variationFromFirstDay: 0.1 },
      { day: 4, date: '2023-01-01 às 02:44', value: 103, variationFromPreviousDay: 0.2, variationFromFirstDay: 0.1 }
    ];

    const mockNewData: StockList[] = [
      { day: 1, date: '2023-01-02 às 02:41', value: 110, variationFromPreviousDay: 10, variationFromFirstDay: 10 },
      { day: 2, date: '2023-01-02 às 02:42', value: 110, variationFromPreviousDay: 10, variationFromFirstDay: 10 },
      { day: 3, date: '2023-01-02 às 02:43', value: 110, variationFromPreviousDay: 10, variationFromFirstDay: 10 },
      { day: 4, date: '2023-01-02 às 02:44', value: 110, variationFromPreviousDay: 10, variationFromFirstDay: 10 }
    ];

    // Definindo dados iniciais e chamando ngOnChanges para simular a mudança de dados
    component.stockData = mockInitialData;
    component.ngOnChanges();
    let initialDataSet = component.lineChartData.datasets[0].data;

    // Atualizando os dados e chamando ngOnChanges novamente
    component.stockData = mockNewData;
    component.ngOnChanges();
    let newDataSet = component.lineChartData.datasets[0].data;

    expect(initialDataSet).not.toEqual(newDataSet);
  });
});