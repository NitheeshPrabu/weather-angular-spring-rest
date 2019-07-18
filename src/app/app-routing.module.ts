import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/apis', pathMatch: 'full' },
  {
    path: 'apis',
    loadChildren: () => import('./apis/apis.module').then(m => m.ApisModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
