import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { UserComponent } from './user/user.component';
import { RoleGuard } from './service/role.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'supervisor', component: SupervisorComponent, canActivate: [RoleGuard], data: { expectedRole: 'supervisor' } },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { expectedRole: 'user' } },
  { path: '**', redirectTo: 'login' } // Redirect to login page for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }