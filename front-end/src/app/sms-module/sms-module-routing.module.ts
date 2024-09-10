import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { ConfigureTemplateComponent } from './configure-template/configure-template.component';
import { UploadUserDataComponent } from './upload-user-data/upload-user-data.component';
import { HistoryComponent } from './history/history.component';
import { EdashboardComponent } from './edashboard/edashboard.component';

const routes: Routes = [
  { path: 'create-template', component: CreateTemplateComponent },
  { path: 'configure-template', component: ConfigureTemplateComponent },
  { path: 'upload-user-data', component: UploadUserDataComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'edashboard', component: EdashboardComponent },
  // Redirect to default path or add a default component
  { path: '', redirectTo: 'create-template', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SMSModuleRoutingModule { }







