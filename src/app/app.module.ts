import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { UserComponent } from './user/user.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProfileComponent } from './admin/profile/profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    SupervisorComponent,
    UserComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
