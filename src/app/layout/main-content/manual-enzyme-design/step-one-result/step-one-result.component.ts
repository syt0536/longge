import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
import {ParamsFile} from '../../../../model/params-file';
import {GlobalService} from '../../../../service/global/global.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-step-one-result',
  templateUrl: './step-one-result.component.html',
  styleUrls: ['./step-one-result.component.css']
})
export class StepOneResultComponent implements OnInit {
  paramsFileList: ParamsFile;
  reNumProteinFileText: Text;
  ligandParamsFileText: Text;
  inputPosFile: Text;
  jobName: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this._getFileText();
  }

  private _getFileText() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      // this.paramsFileList = JSON.parse(params.get('paramsFileList'));
      this.jobName = params.get('jobName');
      console.log('thisParams:', this.paramsFileList, this.jobName);
      this.rest.getData(`params/?filter{job_name}=${this.jobName}`)
        .subscribe(data => {
          this.paramsFileList = data['submit_paramters'][0];
          console.log('paramsFileList:', this.paramsFileList);
          this._getInputPositionFileText();
          this._getLigandParamsFileText();
          this._getRenNumProteinFileText();
        });
    });
  }

  private _getRenNumProteinFileText(): void {
    this.rest.getFileText(this.paramsFileList['protein_renumber_file'])
      .subscribe(data => {
        // data 为文件文本内容
        this.reNumProteinFileText = data;
        console.log('>>>>', this.reNumProteinFileText);
      });
  }

  private _getLigandParamsFileText(): void {
    this.rest.getFileText(this.paramsFileList['ligand_params_file'])
      .subscribe(data => {
        // data 为文件文本内容
        this.ligandParamsFileText = data;
      });
  }

  private _getInputPositionFileText(): void {
    this.rest.getFileText(this.paramsFileList['inputs_pos_file'])
      .subscribe(data => {
        // data 为文件文本内容
        this.inputPosFile = data;
      });
  }

  onNextStep() {
    this.globalService.setNextStepValue(1);
    this.router.navigate(['manual-design/manual-design/step-two']);
  }
}
