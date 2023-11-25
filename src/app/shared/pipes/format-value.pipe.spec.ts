import { StockListComponent } from 'src/app/modules/finance/components/stock-list/stock-list.component';
import { FormatValuePipe } from './format-value.pipe';
import { TestBed } from '@angular/core/testing';

describe('FormatValuePipe', () => {
  const pipe = new FormatValuePipe();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StockListComponent,
        FormatValuePipe, // Declare o pipe aqui
      ],
      // ...
    }).compileComponents();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Sem informação" for undefined', () => {
    expect(pipe.transform(undefined)).toBe('Sem informação');
  });

  it('should return "Sem informação" for null', () => {
    expect(pipe.transform(null)).toBe('Sem informação');
  });

  it('should return "Sem informação" for 0', () => {
    expect(pipe.transform(0)).toBe('Sem informação');
  });

  it('should format positive numbers as currency', () => {
    const result = pipe.transform(1234);
    expect(result).toContain('R$');
    expect(result).toContain('1.234');
  });

});