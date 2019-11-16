import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../../../service/global/global.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {
  stepFourForm: FormGroup;
  cstFile: File;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router,
              private globalService: GlobalService ) { }

  ngOnInit() {
    this.stepFourForm = this.fb.group({
      job_name: ['', [Validators.required]],
      // design_mini_range: ['', Validators.required],
      range1: ['', [Validators.required]],
      range2: ['', [Validators.required]],
      range3: ['', [Validators.required]],
      range4: ['', [Validators.required]],
      range5: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)]]
    });
  }

  fileChange(event) {
    console.log('event', event);
    this.cstFile = event.target.files[0];
    if (!this.isCstFile(this.cstFile)) {
      alert('Please input pdb format protein file!');
    }
  }

  isCstFile(file: File) {
    const reg = /\.cst$/;
    const isCstFormat = reg.test(file.name);
    return isCstFormat;
  }

  onSubmit() {
    if (this.stepFourForm.invalid) {
      for (const i in this.stepFourForm.controls) {
        // console.log('stepForm:', this.stepFourForm.controls);
        this.stepFourForm.controls[i].markAsDirty();
        this.stepFourForm.controls[i].updateValueAndValidity();
      }
    }
    // else if (!this.cstFile || !this.isCstFile(this.cstFile)) {
    //   alert('Please input cst file!');  // cst 文件可以不传;
    // }
    else {
      this.uploadForm();
    }
  }

  // 处理表单数据个格式，并上传文件
  uploadForm() {
    const form = this.stepFourForm.value;
    const formData = new FormData();
    const designRange = form.range1 + ';' + form.range2 + ';' + form.range3 + ';'
      + form.range4 + ';' + form.range5;
    formData.append('job_name', form.job_name.trim());
    formData.append('design_mini_range', designRange);
    formData.append('user_email', form.user_email.trim());
    formData.append('design_cst', this.cstFile);

    this.rest.postData('fourth-step/', formData)
      .subscribe(data => {
          // console.log(data);
          alert('Submitted Successfully! Please receive the email ' +
            'after the fourth step and then proceed to the fifth operation.');
        },
        error => {
          console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
        this.globalService.setNextStepValue(4);
        this.router.navigate(['manual-design/manual-design/step-five']);
        });
  }
}
