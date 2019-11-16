import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
import {GlobalService} from '../../../../service/global/global.service';
import {ParamsFile} from '../../../../model/params-file';

@Component({
  selector: 'app-step-two-result',
  templateUrl: './step-two-result.component.html',
  styleUrls: ['./step-two-result.component.css']
})
export class StepTwoResultComponent implements OnInit {
  paramsFileList: ParamsFile;
  matchCstFileText: Text;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this._getFileText();
  }

  private _getFileText():void {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        // this.paramsFileList = params.get('paramsFileList');
        const jobName = params.get('jobName');
        // fetch ParamsListFile use download, fetch CStFileText
        this.rest.getData(`params/?filter{job_name}=${jobName}`)
          .subscribe(data => {
            this.paramsFileList = data['submit_paramters'][0];
            this._getCstFile();
          });
      });
  }

  private _getCstFile() {
    this.rest.getFileText(this.paramsFileList['match_cst_file'])
      .subscribe(data => {
        this.matchCstFileText = data;
      });
  }

  onNextStep() {
    this.globalService.setNextStepValue(2);
    this.router.navigate(['manual-design/manual-design/step-three']);
  }
}
