import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../service/global/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manual-design-home',
  templateUrl: './manual-design-home.component.html',
  styleUrls: ['./manual-design-home.component.css']
})
export class ManualDesignHomeComponent implements OnInit {
  currentStep = 0;
  constructor(private globalService: GlobalService,
              private router: Router) {
    this.globalService.nextStepValue$
      .subscribe((value: number) => {
        this.currentStep = value;
      });
  }

  ngOnInit() {

  }

  goStepFive() {
    this.globalService.setNextStepValue(4);
    this.router.navigate(['manual-design/manual-design/step-five']);
  }
}
