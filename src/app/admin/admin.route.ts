import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const adminRoutes: Routes = [
    { 
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'dashboard', component: DashboardComponent },
        ]
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})



export class AdminModule { }
