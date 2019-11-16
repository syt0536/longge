import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {ParamsFile} from '../../../../model/params-file';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {
  stepThreeForm: FormGroup;
  paramsFileList: ParamsFile;
  cstFile: File;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.stepThreeForm = this.fb.group({
      job_name: ['', [Validators.required]]
    });
  }

  fileChange(event) {
    console.log('event', event);
    this.cstFile = event.target.files[0];
    if (!this.isCstFile(this.cstFile)) {
     alert('Please input .cst file!');
    }
  }

  isCstFile(file: File) {
    const reg = /\.cst$/;
    const isCstFormat = reg.test(file.name);
    return isCstFormat;
  }

  onSubmit() {
    if (this.stepThreeForm.invalid) {
      for (const i in this.stepThreeForm.controls) {
        // console.log('stepForm:', this.stepThreeForm.controls);
        this.stepThreeForm.controls[i].markAsDirty();
        this.stepThreeForm.controls[i].updateValueAndValidity();
      }
    }
    // else if (!this.cstFile || !this.isCstFile(this.cstFile)) {
    //   alert('please input cst file!');
    // }
    else {
      this.uploadForm();
    }
  }

  uploadForm() {
    const formData = new FormData();
    const form = this.stepThreeForm.value;
    formData.append('job_name', form.job_name.trim());
    formData.append('cst_file', this.cstFile);

    this.rest.postData('third-step/', formData)
      .subscribe(data => {
          // this.paramsFileList = data;
          console.log(data);
          alert('Submitted Successfully!');
        },
        error => {
          // console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
          this.router.navigate(['manual-design/manual-design/step-three-result'], {
            queryParams: {
              jobName: form.job_name
            }});
        });
     }

}
