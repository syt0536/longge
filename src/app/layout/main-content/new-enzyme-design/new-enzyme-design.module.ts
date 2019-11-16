import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnzymeDesignProcessComponent } from './enzyme-design-process/enzyme-design-process.component';
import {SharedModule} from '../../../shared/shared.module';
import { EnzymeDesignResultComponent } from './enzyme-design-result/enzyme-design-result.component';
import {NewEnzymeDesignRoutingModule} from './new-enzyme-design-routing.module';


@NgModule({
  declarations: [EnzymeDesignProcessComponent, EnzymeDesignResultComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewEnzymeDesignRoutingModule,
  ]
})
export class NewEnzymeDesignModule { }
