import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { IntentEditComponent } from '../intent-edit/intent-edit.component';
import { IntentListComponent } from '../intent-list/intent-list.component';
import { ReportingComponent } from '../reporting/reporting.component';
import {IntentListResolve} from  '../intent-list-resolver'
const routes : Routes = [
  {path:'intentList',component:IntentListComponent},
  //{path:'intentList',component:IntentListComponent,resolve:{intent : IntentListResolve}},
  {path:'',component:IntentListComponent},
  {path:'intentEdit/:projid/:intent',component:IntentEditComponent},
  {path:'intentEdit/:projid',component:IntentEditComponent},
  {path:'intentEdit',component:IntentEditComponent},
  {path:'reporting',component:ReportingComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ enableTracing: false ,onSameUrlNavigation: 'reload'})
  ],
  exports:[RouterModule],
  declarations: [],
  providers:[IntentListResolve]
})
export class AppRoutingModule { }
export const routingComponents = [IntentListComponent,IntentEditComponent,ReportingComponent]
