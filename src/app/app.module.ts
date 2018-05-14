import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IntentListComponent } from './intent-list/intent-list.component';
import { IntentEditComponent } from './intent-edit/intent-edit.component';
import { AppRoutingModule,routingComponents } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReportingComponent } from './reporting/reporting.component';
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    SideMenuComponent,
    AppComponent,
    routingComponents,
    ReportingComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [SideMenuComponent]
})
export class AppModule { }
