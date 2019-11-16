import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
import {GlobalService} from '../../../../service/global/global.service';

@Component({
  selector: 'app-step-three-result',
  templateUrl: './step-three-result.component.html',
  styleUrls: ['./step-three-result.component.css']
})
export class StepThreeResultComponent implements OnInit {

  paramsFileList: any = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this._getFileText();
  }

  private _getFileText() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      // this.paramsFileList = params.get('paramsFileList');
      const jobName = params.get('jobName');
      this.rest.getData(`params/?filter{job_name}=${jobName}`)
        .subscribe(data => {
          console.log('three-step-data:', data);
          this.paramsFileList = data['submit_paramters'][0];
        });
      // console.log('thisParams:', this.paramsFileList);
    });
  }

  onNextStep() {
    this.globalService.setNextStepValue(3);
    this.router.navigate(['manual-design/manual-design/step-four']);
  }
}
