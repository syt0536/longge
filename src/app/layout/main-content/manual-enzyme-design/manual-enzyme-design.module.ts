import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { ManualDesignHomeComponent } from './manual-design-home/manual-design-home.component';
import {SharedModule} from '../../../shared/shared.module';
import {ManualEnzymeDesignRoutingModule} from './manual-enzyme-design-routing.module';
import { StepOneResultComponent } from './step-one-result/step-one-result.component';
import { StepTwoResultComponent } from './step-two-result/step-two-result.component';
import { StepThreeResultComponent } from './step-three-result/step-three-result.component';
import { StepFiveResultComponent } from './step-five-result/step-five-result.component';

@NgModule({
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    ManualDesignHomeComponent,
    StepOneResultComponent,
    StepTwoResultComponent,
    StepThreeResultComponent,
    StepFiveResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManualEnzymeDesignRoutingModule
  ]
})
export class ManualEnzymeDesignModule { }
