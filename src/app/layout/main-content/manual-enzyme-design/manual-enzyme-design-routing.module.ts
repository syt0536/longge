import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManualDesignHomeComponent} from './manual-design-home/manual-design-home.component';
import {StepOneComponent} from './step-one/step-one.component';
import {StepTwoComponent} from './step-two/step-two.component';
import {StepThreeComponent} from './step-three/step-three.component';
import {StepFourComponent} from './step-four/step-four.component';
import {StepFiveComponent} from './step-five/step-five.component';
import {StepOneResultComponent} from './step-one-result/step-one-result.component';
import {StepTwoResultComponent} from './step-two-result/step-two-result.component';
import {StepThreeResultComponent} from './step-three-result/step-three-result.component';
import {StepFiveResultComponent} from './step-five-result/step-five-result.component';
const routes: Routes = [
  {
    path: 'manual-design',
    component: ManualDesignHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'step-one',
        pathMatch: 'full'
      },
      {
        path: 'step-one',
        component: StepOneComponent
      },
      {
        path: 'step-two',
        component: StepTwoComponent
      },
      {
        path: 'step-three',
        component: StepThreeComponent
      },
      {
        path: 'step-four',
        component: StepFourComponent
      },
      {
        path: 'step-five',
        component: StepFiveComponent
      },
      {
        path: 'step-one-result',
        component: StepOneResultComponent
      },
      {
        path: 'step-two-result',
        component: StepTwoResultComponent
      },
      {
        path: 'step-three-result',
        component: StepThreeResultComponent
      },
      {
        path: 'step-five-result',
        component: StepFiveResultComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManualEnzymeDesignRoutingModule { }
