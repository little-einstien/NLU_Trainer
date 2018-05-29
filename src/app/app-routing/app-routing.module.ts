import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { IntentEditComponent } from '../components/intent-edit/intent-edit.component';
import { IntentListComponent } from '../components/intent-list/intent-list.component';
import { ReportingComponent } from '../reporting/reporting.component';
import {IntentListResolve} from  '../common/intent-list-resolver'
import { AppComponent } from '../app.component';
import { IntegrationComponent } from '../components/integration/integration.component';
import { NewProjectComponent } from '../components/new-project/new-project.component';
import { ProjectSettingComponent } from '../components/project-setting/project-setting.component';



const routes : Routes = [
  {path:'intentList',component:IntentListComponent},
  {path:'newproj',component:NewProjectComponent},
  {path:'setting/:projectid',component:ProjectSettingComponent},
  {path:'intentList/:projectid',component:IntentListComponent},
  //{path:'intentList',component:IntentListComponent,resolve:{intent : IntentListResolve}},
  {path:'',component:IntentListComponent},
  {path:'integration',component:IntegrationComponent},
  {path:'intentEdit/:projid/:intent',component:IntentEditComponent},
  {path:'intentEdit/:projid',component:IntentEditComponent},
  {path:'intentEdit',component:IntentEditComponent},
  {path:'reporting',component:ReportingComponent},
  {path:'picasi/:project',component:AppComponent},
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
export const routingComponents = [IntentListComponent,IntentEditComponent,ReportingComponent,NewProjectComponent,ProjectSettingComponent]
