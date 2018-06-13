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
import { ProjectListComponent } from '../components/project-list/project-list.component';
import { ConversationFlowComponent } from '../components/conversation-flow/conversation-flow.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { EventCalenderComponent } from '../components/event-calender/event-calender.component';
import { RegistrationStepperComponent } from '../components/registration-stepper/registration-stepper.component';


const routes : Routes = [
  {path:'inl',component:IntentListComponent},
  {path:'flow',component:ConversationFlowComponent},
  {path:'newproj',component:NewProjectComponent},
  {path:'settings/:projectid',component:ProjectSettingComponent},
  //{path:'intentList/:projectid',component:IntentListComponent},
  //{path:'intentList/:projectid',component:ProjectListComponent},
  //{path:'intentList',component:IntentListComponent,resolve:{intent : IntentListResolve}},
  {path:'',component:SideMenuComponent},
  {path:'integration/:pid',component:IntegrationComponent},
  //{path:'intentEdit/:projid/:intent',component:IntentEditComponent},
  {path:'ine',component:IntentEditComponent},
  {path:'intentEdit',component:IntentEditComponent},
  {path:'reporting',component:ReportingComponent},
  {path:'picasi/:project',component:AppComponent},
 {path:'ec',component:EventCalenderComponent},
  {path:'stepper',component:RegistrationStepperComponent}
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
