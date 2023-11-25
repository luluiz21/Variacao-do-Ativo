export class StockData {
  chart: Chart = new Chart();
}

export class Chart {
  result: Result[] = [];
  error?: any; 
}

export class Result {
  meta?: Meta;
  timestamp: number[] = [];
  indicators: Indicators = new Indicators();
}

export class Meta {
  currency?: string;
  symbol?: string;
  exchangeName?: string;
  instrumentType?: string;
  firstTradeDate?: number;
  regularMarketTime?: number;
  gmtoffset?: number;
  timezone?: string;
  exchangeTimezoneName?: string;
  regularMarketPrice?: number;
  chartPreviousClose?: number;
  previousClose?: number;
  scale?: number;
  priceHint?: number;
  currentTradingPeriod?: CurrentTradingPeriod;
  tradingPeriods: TradingPeriod[][] = [];
  dataGranularity?: string;
  range?: string;
  validRanges?: string[];
}

export class CurrentTradingPeriod {
  pre?: TradingPeriodDetail;
  regular?: TradingPeriodDetail;
  post?: TradingPeriodDetail;
}

export class TradingPeriodDetail {
  timezone?: string;
  start?: number;
  end?: number;
  gmtoffset?: number;
}

export class TradingPeriod {
  timezone?: string;
  start?: number;
  end?: number;
  gmtoffset?: number;
}

export class Indicators {
  quote: Quote[] = [];
}

export class Quote {
  open: number[] = [];
  low: number[] = [];
  close: number[] = [];
  high: number[] = [];
  volume: number[] = [];
}