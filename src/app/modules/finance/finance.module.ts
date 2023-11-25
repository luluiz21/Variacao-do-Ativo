import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockChartComponent } from '../finance/components/stock-chart/stock-chart.component';
import { StockListComponent } from '../finance/components/stock-list/stock-list.component';
import { DashboardComponent } from '../finance/components/dashboard/dashboard.component';
import { FinanceRoutingModule } from './finance-routing.module';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { FormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormatSpecialValuesPipe } from 'src/app/shared/pipes/format-special-values.pipe';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StockChartComponent,
    StockListComponent,
    DashboardComponent,
    StockSelectorComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    SharedModule  
  ]
})
export class FinanceModule { }
