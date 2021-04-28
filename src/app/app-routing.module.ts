import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrPageComponent } from './hr-page/hr-page.component';
import { InterviewerPageComponent } from './interviewer-page/interviewer-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'hr-page', component: HrPageComponent },
  { path: 'interviewer-page', component: InterviewerPageComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
