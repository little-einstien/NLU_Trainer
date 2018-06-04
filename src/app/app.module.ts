import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule,routingComponents } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReportingComponent } from './reporting/reporting.component';
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe} from './common/filter.pipe';
import { NewProjectModalComponent } from './components/new-project-modal/new-project-modal.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { IntentListComponent } from './components/intent-list/intent-list.component';
import { IntentEditComponent } from './components/intent-edit/intent-edit.component';
import { IntegrationComponent } from './components/integration/integration.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectSettingComponent } from './components/project-setting/project-setting.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConversationFlowComponent } from './components/conversation-flow/conversation-flow.component';


 
@NgModule({
  declarations: [
    SideMenuComponent,
    AppComponent,
    routingComponents,
    ReportingComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartComponent,
    FilterPipe,
    NewProjectModalComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageFormComponent,
    ProjectListComponent,
    IntentListComponent,
    IntentEditComponent,
    IntegrationComponent,
    NewProjectComponent,
    ProjectSettingComponent,
    ConversationFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,ClipboardModule,NgxSpinnerModule 
  ],
  providers: [],
  bootstrap: [SideMenuComponent]
})
export class AppModule { }
