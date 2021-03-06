import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
// routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VoiceToolComponent } from './components/voice-tool/voice-tool.component';
import { ListComponent } from './components/list/list.component';
// service
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular material
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { DisabledComponent } from './components/disabled/disabled.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UsersManualComponent } from './components/users-manual/users-manual.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    VoiceToolComponent,
    ListComponent,
    FooterComponent,
    DisabledComponent,
    EditProfileComponent,
    UsersManualComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})

export class AppModule {}
