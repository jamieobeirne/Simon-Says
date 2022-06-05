import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VoiceToolComponent } from './components/voice-tool/voice-tool.component';
import { ListComponent } from './components/list/list.component';
import { DisabledComponent } from './components/disabled/disabled.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UsersManualComponent } from './components/users-manual/users-manual.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'home', component: HomeComponent },
  { path: 'voice-tool', component: VoiceToolComponent },
  { path: 'list', component: ListComponent },
  { path: 'disabled', component: DisabledComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'users-manual', component: UsersManualComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
