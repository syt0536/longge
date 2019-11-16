import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {GlobalService} from '../../../../service/global/global.service';
import {RestService} from '../../../../service/rest/rest.service';
import {ParamsFile} from '../../../../model/params-file';

@Component({
  selector: 'app-step-five-result',
  templateUrl: './step-five-result.component.html',
  styleUrls: ['./step-five-result.component.css']
})
export class StepFiveResultComponent implements OnInit {

  paramsFileList = '';
  designLigandOutFileText = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this._getFileText();
  }

  private _getFileText(): void {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        // this.paramsFileList = params.get('paramsFileList');
        const jobName = params.get('jobName');
        this.rest.getData(`params/?filter{job_name}=${jobName}`)
          .subscribe(data => {
            this.paramsFileList = data['submit_paramters'];
            console.log('submit_paramters:', this.paramsFileList);
            this._getOutFile();
          });
      });
  }

  private _getOutFile() {
    this.rest.getFileText(this.paramsFileList['filtered_designed_ligandname_out'])
      .subscribe(data => {
        this.designLigandOutFileText = data;
      });
  }

  gohome() {
    this.router.navigate(['./home']);
  }

}
