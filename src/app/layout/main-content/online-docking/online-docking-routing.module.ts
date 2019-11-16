import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnlineDockingComponent} from './online-docking/online-docking.component';
import {DockResultComponent} from './dock-result/dock-result.component';
const routes: Routes = [
  {
    path: 'analysis',
    component: OnlineDockingComponent
  },
  {
    path: 'analysis-result',
    component: DockResultComponent
  }
  ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OnlineDockingRoutingModule { }
