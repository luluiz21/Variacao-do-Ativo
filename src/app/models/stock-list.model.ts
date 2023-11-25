export class StockList{
    day?: number; // Dia começando em 1
    date?: string; // Data no formato YYYY-MM-DD
    value?: number; // Valor de abertura
    variationFromPreviousDay: number = 0 ; // Variação em relação a D-1
    variationFromFirstDay: number = 0; // Variação em relação à primeira data
}