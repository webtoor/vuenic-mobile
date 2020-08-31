import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'auth/:provider/callback',
    loadChildren: () => import('./pages/auth-callback/auth-callback.module').then( m => m.AuthCallbackPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'list-project',
    loadChildren: () => import('./pages/list-project/list-project.module').then( m => m.ListProjectPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'create-project',
    loadChildren: () => import('./pages/create-project/create-project.module').then( m => m.CreateProjectPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'create-device-sensor/:user_project_id',
    loadChildren: () => import('./pages/create-device-sensor/create-device-sensor.module').then( m => m.CreateDeviceSensorPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'conf-project/:user_project_id',
    loadChildren: () => import('./pages/conf-project/conf-project.module').then( m => m.ConfProjectPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'chart/:projectID/:sensorID',
    loadChildren: () => import('./pages/chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'table-sensor/:projectDeviceID/:sensorID/:userProjectID',
    loadChildren: () => import('./pages/table-sensor/table-sensor.module').then( m => m.TableSensorPageModule)
  },
  {
    path: 'delete-confirm',
    loadChildren: () => import('./pages/delete-confirm/delete-confirm.module').then( m => m.DeleteConfirmPageModule)
  },
  {
    path: 'add-sensor/:projectDeviceID',
    loadChildren: () => import('./pages/add-sensor/add-sensor.module').then( m => m.AddSensorPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },

 /*  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate : [AuthGuardService]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate : [AuthGuardService]
  } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
