import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-enzyme-design-result',
  templateUrl: './enzyme-design-result.component.html',
  styleUrls: ['./enzyme-design-result.component.css']
})
export class EnzymeDesignResultComponent implements OnInit {
  newEnzymeDesignForm2: FormGroup;
  other_params: any;
  selectedValue = '<';
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.other_params = {
      params1: ['', [Validators.required]],
      params2: ['', [Validators.required]],
      params3: ['', [Validators.required]]
    };
    this.newEnzymeDesignForm2 = this.fb.group({
      job_name: ['', [Validators.required]],
      outpur: ['', [Validators.required]],
      other_params: this.fb.array([this.fb.group(this.other_params)]),
    });
  }
  get otherparams(): FormArray {
    return this.newEnzymeDesignForm2.get('other_params') as FormArray;
  }
    // 添加other_ligands参数
    addOtherLigand() {
      this.otherparams.push(this.fb.group(this.other_params));
      console.log('other_ligands:', this.otherparams.value); // todo delete
    }
    // 移除 other_ligands参数
    removeOtherLigand() {
      this.otherparams.controls.pop();
    }
    formSubmit() {
      // 表单验证不通过错误提示
      // if (!this.proteinFile || !this.isPdbFile(this.proteinFile)) {
      //   alert('please input pdb format file!');
      // } else if (this.newEnzymeDesignForm.invalid) {
      //   for (const i in this.newEnzymeDesignForm.controls) {
      //     this.newEnzymeDesignForm.controls[i].markAsDirty();
      //     this.newEnzymeDesignForm.controls[i].updateValueAndValidity();
      //   }
      //   if (this.otherLigands.invalid) {
      //     alert('please input the complete other ligand parameters!');
      //   } else if (this.fixResiduesList.invalid) {
      //     alert('please input the complete fix residues list!');
      //   }
      // } else {
      //   this.uploadFile();
      // }
    }
  }


