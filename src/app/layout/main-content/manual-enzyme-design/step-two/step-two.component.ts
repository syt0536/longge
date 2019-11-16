import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {ParamsFile} from '../../../../model/params-file';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  stepTwoForm: FormGroup;
  paramsFileList: ParamsFile;
  constrain: any;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) {
    this.constrain = {
      CST_A_chain_name: ['', [Validators.required]],
      CST_A_residue_name: ['', [Validators.required]],
      CST_A_residue_ID: ['', [Validators.required]],
      Atom_A1: ['', [Validators.required]],
      Atom_A2: ['', [Validators.required]],
      Atom_A3: ['', [Validators.required]],
      CST_B_chain_name: ['', Validators.required],
      CST_B_residue_name: ['', Validators.required],
      CST_B_residue_ID: ['', Validators.required],
      Atom_B1: ['', [Validators.required]],
      Atom_B2: ['', [Validators.required]],
      Atom_B3: ['', [Validators.required]],
      atom_type_prefix: ['type1', [Validators.required]],
      Atom_type: [''],
      atom_A1: [''],
      atom_A2: [''],
      atom_A3: [''],
      at1: ['0.2', [Validators.required]],  // cf is specifies the allowed tolerance
      at2: ['10.0', [Validators.required]],
      at3: ['10.0', [Validators.required]],
      at4: ['10.0', [Validators.required]],
      at5: ['10.0', [Validators.required]],
      at6: ['10.0', [Validators.required]],
      fc1: ['100.0', [Validators.required]], // fc is specifies the force constant
      fc2: ['60.0', [Validators.required]],
      fc3: ['60.0', [Validators.required]],
      fc4: ['60.0', [Validators.required]],
      fc5: ['60.0', [Validators.required]],
      fc6: ['60.0', [Validators.required]],
      ppc1: ['0', [Validators.required]], // ppc is specifies the periodicity per of the constant
      ppc2: ['360.0', [Validators.required]],
      ppc3: ['360.0', [Validators.required]],
      ppc4: ['360.0', [Validators.required]],
      ppc5: ['360.0', [Validators.required]],
      ppc6: ['360.0', [Validators.required]],
      shsm1: ['0', [Validators.required]], // shsm is optional and specifies how many simples the matcher
      shsm2: ['0', [Validators.required]],
      shsm3: ['0', [Validators.required]],
      shsm4: ['0', [Validators.required]],
      shsm5: ['0', [Validators.required]],
      shsm6: ['0', [Validators.required]],
    };
  }

  ngOnInit() {
    this.stepTwoForm = this.fb.group({
      job_name: ['', Validators.required],
      cat_ID: ['', Validators.required],
      constrain_info: this.fb.array(
        [this.fb.group(this.constrain)
        ]),
    });
  }

  get constrainInfo(): FormArray {
   return this.stepTwoForm.get('constrain_info') as FormArray;
  }

  // get atomTypePrefix() {
  //   return this.stepTwoForm.get('atom_type_prefix').value;
  // }

  addConstrain() {
    this.constrainInfo.push(this.fb.group(this.constrain));
    console.log('constrainInfo:', this.constrainInfo);
  }

  removeConstrain() {
    this.constrainInfo.controls.pop();
  }

  onSubmit() {
    const form = this.stepTwoForm.value;
    if (this.stepTwoForm.invalid) { // 表单无效
      for (const i in this.stepTwoForm.controls) {
        // console.log('stepForm:', this.stepTwoForm.controls);
        this.stepTwoForm.controls[i].markAsDirty();
        this.stepTwoForm.controls[i].updateValueAndValidity();
      }
      // constrain_info 表单错误处理
      this.constrainInfo.invalid ? alert('Please input the complete constrains!') : null;
    } else { // 判断文件 Atom type
       // Atom type value is null
      for (const constrain of form.constrain_info) {
        if (constrain['atom_type_prefix'].value === 'type1' && !constrain.Atom_type) {
        alert('Please input atom type!');
      } else if (constrain['atom_type_prefix'].value === 'type2' && (!constrain.atom_A1 || !constrain.atom_A2 || !constrain.atom_A3)) {
        alert('Please input atom type!');
      } else { // upload form
          this.uploadForm();
          console.log(this.stepTwoForm.value);
        }
      }
    }
  }

  uploadForm() {
    const form = this.stepTwoForm.value;
    const formData = new FormData();
    let constrainValue = '';
    // constrain_info 数据格式处理
    for (const constrain of form.constrain_info) {
      const constrainArray = [];
      constrainArray.push(
        constrain['CST_A_chain_name'].trim(),
        constrain['CST_A_residue_ID'].trim(),
        constrain['CST_A_residue_name'].trim(),
        constrain['Atom_A1'].trim(),
        constrain['Atom_A2'].trim(),
        constrain['Atom_A3'].trim(),
        constrain['CST_B_chain_name'].trim(),
        constrain['CST_B_residue_ID'].trim(),
        constrain['CST_B_residue_name'].trim(),
        constrain['Atom_B1'].trim(),
        constrain['Atom_B2'].trim(),
        constrain['Atom_B3'].trim(),
      );
      console.log('constainArray:', constrainArray,
        'constrain:', constrain, 'constrainInfo',
        this.constrainInfo, 'info:', form.constrain_info); // todo delete
      constrainValue += constrainArray.join(':');
      if (constrain.atom_type_prefix === 'type1') {
        constrainValue += '-type:' + constrain.Atom_type.trim();
      } else if (constrain['atom_type_prefix'] === 'type2') {
        constrainValue += '-' + constrain['atom_A1'].trim() + ':' + constrain['atom_A2'].trim() + ':' + constrain['atom_A3'].trim();
      }
      constrainValue += '-' + constrain['at1'] + ':' + constrain['at2'] + ':' + constrain['at3'] + ':'
        + constrain['at4'] + ':' + constrain['at5'] + ':' + constrain['at6'] + '-'
        + constrain['fc1'] + ':' + constrain['fc2'] + ':' + constrain['fc3'] + ':'
        + constrain['fc4'] + ':' + constrain['fc5'] + ':' + constrain['fc6'] + '-'
        + constrain['ppc1'] + ':' + constrain['ppc2'] + ':' + constrain['ppc3'] + ':'
        + constrain['ppc4'] + ':' + constrain['ppc5'] + ':' + constrain['ppc6'] + '-'
        + constrain['shsm1'] + ':' + constrain['shsm2'] + ':' + constrain['shsm3'] + ':'
        + constrain['shsm4'] + ':' + constrain['shsm5'] + ':' + constrain['shsm6'] + ',';
    }
    // console.log('constrainValue:', constrainValue);
    // 移除最后一个"-"
    constrainValue = constrainValue.slice(0, -1);
    console.log('constrainValue:', constrainValue);
    formData.append('job_name', form.job_name.trim());
    formData.append('cat_ID', form.cat_ID.trim());
    formData.append('constrain_info', constrainValue);
    this.rest.postData('second-step/', formData)
      .subscribe(data => {
        // this.paramsFileList = data;
          alert('Submitted Successfully!');
      },
      error => {
        console.log(error.message);
        alert('Submitted Failed');
      },
        () => {
        this.router.navigate(['manual-design/manual-design/step-two-result'], {
          queryParams: {
            // paramsFileList: this.paramsFileList
            jobName: form.job_name
          }});
        });
  }


}
