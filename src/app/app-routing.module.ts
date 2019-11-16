import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './layout/main-content/page/home/home.component';
import {EnzymeDesignProcessComponent}from './layout/main-content/new-enzyme-design/enzyme-design-process/enzyme-design-process.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'mut-analysis',
    loadChildren: './layout/main-content/online-docking/online-docking.module#OnlineDockingModule'
  },
  {
    path: 'manual-design',
    loadChildren: './layout/main-content/manual-enzyme-design/manual-enzyme-design.module#ManualEnzymeDesignModule'
    // component: EnzymeDesignProcessComponent
  },
  {
    path: 'new-enzyme-design',
    loadChildren: './layout/main-content/new-enzyme-design/new-enzyme-design.module#NewEnzymeDesignModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
