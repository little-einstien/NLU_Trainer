import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { IntentEditComponent } from '../intent-edit/intent-edit.component';
import { IntentListComponent } from '../intent-list/intent-list.component';
import { ReportingComponent } from '../reporting/reporting.component';
const routes : Routes = [
  {path:'intentList',component:IntentListComponent},
  {path:'intentEdit/:intent',component:IntentEditComponent},
  {path:'reporting',component:ReportingComponent},
]



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [IntentListComponent,IntentEditComponent,ReportingComponent]
