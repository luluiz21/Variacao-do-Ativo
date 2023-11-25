import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockSelectorComponent } from './stock-selector.component';
import { FinanceDataService } from 'src/app/core/services/finance-data.service';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('StockSelectorComponent', () => {
  let component: StockSelectorComponent;
  let fixture: ComponentFixture<StockSelectorComponent>;
  let financeServiceSpy: jasmine.SpyObj<FinanceDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FinanceDataService', ['searchStocks']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatIconModule,
        BrowserAnimationsModule
        
      ],
      declarations: [StockSelectorComponent],
      providers: [{ provide: FinanceDataService, useValue: spy }]
    }).compileComponents();

    financeServiceSpy = TestBed.inject(FinanceDataService) as jasmine.SpyObj<FinanceDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit stockSelected when an option is selected', () => {
    spyOn(component.stockSelected, 'emit');
    const option = { option: { value: 'AAPL' } };
    component.onOptionSelected(option);

    expect(component.stockSelected.emit).toHaveBeenCalledWith('AAPL');
  });

  it('should emit searchClicked when search button is clicked', () => {
    spyOn(component.searchClicked, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'AAPL';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.onSearchClick();

    expect(component.searchClicked.emit).toHaveBeenCalledWith('AAPL');
  });
});
