import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinanceDataService } from './finance-data.service';
import { StockData } from 'src/app/models/stock-data.model';

describe('FinanceDataService', () => {
  let service: FinanceDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinanceDataService]
    });

    service = TestBed.inject(FinanceDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Após cada teste, verificamos se não há requisições que esperávamos ter acontecido e que ainda não foram feitas.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStockData should return expected data', (done) => {
    const mockStockData = new StockData();
    const symbol = 'AAPL';

    service.getStockData(symbol).subscribe(data => {
      expect(data).toEqual(mockStockData);
      done();
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}${symbol}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockStockData);
  });

  it('searchStocks should return results', (done) => {
    const mockSearchResults = [{}];
    const query = 'Uber';

    service.searchStocks(query).subscribe(results => {
      expect(results.length).toBeGreaterThan(0);
      expect(results).toEqual(mockSearchResults);
      done();
    });

    const req = httpTestingController.expectOne(`${service.apiSearchUrl}${query}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSearchResults);
  });

  // ... outros testes
});
