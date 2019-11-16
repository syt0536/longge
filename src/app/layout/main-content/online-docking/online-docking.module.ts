import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineDockingComponent } from './online-docking/online-docking.component';
import {SharedModule} from '../../../shared/shared.module';
import {OnlineDockingRoutingModule} from './online-docking-routing.module';
import { DockResultComponent } from './dock-result/dock-result.component';

@NgModule({
  declarations: [
    OnlineDockingComponent,
    DockResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OnlineDockingRoutingModule
  ]
})
export class OnlineDockingModule { }
