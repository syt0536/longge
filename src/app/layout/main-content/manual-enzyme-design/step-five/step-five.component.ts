import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {ParamsFile} from '../../../../model/params-file';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css']
})
export class StepFiveComponent implements OnInit {
  stepFiveForm: FormGroup;
  setParams: any;
  paramsFileList: ParamsFile;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) {
    this.setParams = {
      params: ['', [Validators.required]]
    };
  }

  ngOnInit() {
    this.stepFiveForm = this.fb.group({
      job_name: ['', [Validators.required]],
      // output: ['', [Validators.required]],
      analysis_params: this.fb.array([this.fb.group(this.setParams)]),
      output_params: ['', [Validators.required]]
    });
  }

  get aysParams(): FormArray {
    return this.stepFiveForm.get('analysis_params') as FormArray;
  }

  addParams() {
    this.aysParams.push(this.fb.group(this.setParams));
    console.log('params:', this.setParams);
  }

  removeParams() {
    this.aysParams.controls.pop();
  }

  onSubmit() {
    if (this.stepFiveForm.invalid) { // form invalid
      for (const i in this.stepFiveForm.controls) {
        // console.log('stepForm:', this.stepFiveForm.controls);
        this.stepFiveForm.controls[i].markAsDirty();
        this.stepFiveForm.controls[i].updateValueAndValidity();
      }
      if (this.aysParams.invalid) {
       alert('Please input the complete analysis parameters!');
      }
    } else {
      // upload form to server
      this.uploadForm();
    }
  }

  uploadForm() {
    const form = this.stepFiveForm.value;
    const formData = new FormData();
    const analysisParamsArray = [];
    for (const analysis of form.analysis_params) {
      analysisParamsArray.push( `req ${analysis['params'].trim()}`);
    }
    const analysisParamsValue = analysisParamsArray.join(';') + ';output' + form.output_params.trim();
    formData.append('job_name', form.job_name);
    formData.append('analysis_params', analysisParamsValue);

    this.rest.postData('fifth-step/', formData)
      .subscribe(data => {
          this.paramsFileList = data;
          alert('Submitted Successfully!');
        },
        error => {
          console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
          this.router.navigate(['manual-design/manual-design/step-five-result'], {
            queryParams: {
              jobName: form.job_name
            }});
        });
  }
}
