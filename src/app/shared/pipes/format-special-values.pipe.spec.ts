import { StockListComponent } from 'src/app/modules/finance/components/stock-list/stock-list.component';
import { FormatSpecialValuesPipe } from './format-special-values.pipe';
import { TestBed } from '@angular/core/testing';

describe('FormatSpecialValuesPipe', () => {
  // Instanciando o pipe
  const pipe = new FormatSpecialValuesPipe();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StockListComponent,
        FormatSpecialValuesPipe, // Declare o pipe aqui
      ],
      // ...
    }).compileComponents();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "-" for Infinity', () => {
    expect(pipe.transform(Infinity)).toBe('-');
  });

  it('should return "-" for -Infinity', () => {
    expect(pipe.transform(-Infinity)).toBe('-');
  });

  it('should return "-" for 0', () => {
    expect(pipe.transform(0)).toBe('-');
  });

  it('should return "-" for -100', () => {
    expect(pipe.transform(-100)).toBe('-');
  });

  it('should return formatted percentage for other numbers', () => {
    expect(pipe.transform(0.1234)).toBe('0.12%');
    expect(pipe.transform(1.5)).toBe('1.50%');
    expect(pipe.transform(-2.345)).toBe('-2.35%');
  });
});