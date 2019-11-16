import {RouterModule, Routes} from '@angular/router';
import {EnzymeDesignProcessComponent} from './enzyme-design-process/enzyme-design-process.component';
import {EnzymeDesignResultComponent} from './enzyme-design-result/enzyme-design-result.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'enzyme-design-process',
    component: EnzymeDesignProcessComponent
  },
  {
    path: 'enzyme-design-result',
    component: EnzymeDesignResultComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class NewEnzymeDesignRoutingModule { }
