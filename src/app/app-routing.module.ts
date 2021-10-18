import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        canActivate: [AuthGuard],
        component: LoginComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
