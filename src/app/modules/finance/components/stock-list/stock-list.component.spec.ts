import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockListComponent } from './stock-list.component';
import { StockList } from 'src/app/models/stock-list.model';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListComponent ],
      imports: [
        MatIconModule,
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no stocks if none are provided', () => {
    expect(component.stocks.length).toBe(0);
  });

  it('should display stocks when provided', () => {
    const mockStocks: StockList[] = [];

    component.stocks = mockStocks;
    fixture.detectChanges(); // Trigger a change detection cycle for the component

    expect(component.stocks.length).toBe(mockStocks.length);
    // If you are checking for DOM elements:
    const stockItems = fixture.nativeElement.querySelectorAll('.stock-item-class'); // Use the actual class or element used to list stocks
    expect(stockItems.length).toBe(mockStocks.length);
  });

  // You could also add tests to check if the correct data is displayed in the template
  // but that often requires DOM testing and is more of an integration test.
});