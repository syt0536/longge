import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {ParamsFile} from '../../../../model/params-file';
import {map, startWith, switchMap} from 'rxjs/internal/operators';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  stepOneForm: FormGroup;
  proteinFile: File;
  ligandFile: File;
  fileReadResult: any;
  paramsFileList: ParamsFile;
  reNumProteinUrl: string;
  restHost = environment.REST_HOST;
  blob = new Blob();
  other_ligand: any;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) {

    this.other_ligand = {
      params1: ['', [Validators.required]],
      params2: ['', [Validators.required]],
      params3: ['', [Validators.required]]
  };
  }

  ngOnInit() {
    this.stepOneForm = this.fb.group({
      job_name: ['', [Validators.required]],
      res_chain: ['', [Validators.required]],
      res_ligand_chain: ['', [Validators.required]],
      res_ligand_ID: ['', [Validators.required]],
      res_ligand_name: ['', [Validators.required]],
      design_ligand_name: ['ABC', [Validators.required]],
      other_ligands: this.fb.array([this.fb.group(this.other_ligand)]),
    });
  }

  get otherLigands(): FormArray {
   return this.stepOneForm.get('other_ligands') as FormArray;
  }

  addLigand() {
    this.otherLigands.push(this.fb.group(this.other_ligand));
    console.log('other_ligands:', this.otherLigands.value); // todo delete
  }

  removeLigand() {
    this.otherLigands.controls.pop();
  }

  proteinFileChange(event) {
    console.log('event', event);
    this.proteinFile = event.target.files[0];
    if (!this.isPdbFile(this.proteinFile)) {
      alert('Please input pdb format protein file!');
    } else {
      this.readFile(this.proteinFile)
        .then((result) => {
          this.fileReadResult = result;
          // console.log(result);
        });
      // console.log('fileReadResult1:', this.fileReadResult); // todo delete
    }
    }

  readFile(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        // console.log('this.result', this.result, 'reader.result:', reader.result);
        resolve(this.result);
      }; // todo add reject
    });
  }

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const isPdbFormat = reg.test(file.name);
    return isPdbFormat;
  }

  renumber() {
    if (this.stepOneForm.get('job_name').errors) {
      alert('Please input job name!');
        // todo
    } else if (!this.proteinFile || !this.isPdbFile(this.proteinFile)) {
      alert('Please input pdb format protein file!');
    } else {
      const jobName = this.stepOneForm.value.job_name;
      const renumData = new FormData();
      renumData.append('job_name', jobName.trim());
      renumData.append('protein', this.proteinFile);
      this.rest.postData(`prepare-protein/`, renumData)
        .subscribe(data => {
          this.reNumProteinUrl = `${this.restHost}` + data['protein_renumber_file'];
          // console.log('renumber:', data); // todo delete
        },
          error => {
          console.log('error:', error);
          alert('File renumber failed!');
          },
          () => {
          });
    }
  }

  ligandFileChange(event) {
    this.ligandFile = event.target.files[0];
    if (!this.isMol2File(this.ligandFile)) {
      alert('Please input mol2 format ligand file');
    }
  }

  isMol2File(file: File) {
    const reg = /\.mol2$/;
    const isMol2Format = reg.test(file.name);
    return isMol2Format;
  }

  onSubmit() {
    // 判断蛋白和配体的文件是否存在，以及文件的格式是否正确
    if (!this.proteinFile || !this.isPdbFile(this.proteinFile)) {
      alert('Please input pdb format protein file!');
    } else if (!this.ligandFile || !this.isMol2File(this.ligandFile)) {
      alert('Please input mol2 format protein file!');
    } else if (this.stepOneForm.invalid) { // 表单无效
        for (const i in this.stepOneForm.controls) {
          // console.log('stepForm:', this.stepOneForm.controls);
          this.stepOneForm.controls[i].markAsDirty();
          this.stepOneForm.controls[i].updateValueAndValidity();
        }
        // other ligand validate
        // for (const j in this.otherLigands.controls) {
        //   console.log('otherLigands:', this.otherLigands.controls);
        //   for (const k in this.otherLigands.controls[j]) {
        //     console.log('otherLigands:', j['controls']);
        //     this.otherLigands.controls[j]['controls'][k].markAsDirty();
        //     this.otherLigands.controls[j]['controls'][k].updateValueAndValidity();
        //     console.log('a',this.otherLigands.controls[j]['controls'][j]);
        //   }
        // }
        if (this.otherLigands.invalid) {
          alert('please input the complete ligand parameters!');
        }
      } else { // 上传文件
        this.uploadFile();
      }
  }

  uploadFile() {
    const formData = new FormData();
    const form = this.stepOneForm.value;
     // 将other_params整理成‘[A,215,MG,A,218,HOH]'
    const otherLigands = this.otherLigands.value;
    const otherLigandsArray = [];
    for (const ligand of otherLigands) {
      otherLigandsArray.push(
        this.stringToTitleCase(ligand['params1'].trim()),
        this.stringToTitleCase(ligand['params2'].trim()),
        this.stringToTitleCase( ligand['params3'].trim())
        );
      // console.log('otherArray:', otherLigandsArray); // todo delete
    }
    const otherLigandsValue = otherLigandsArray.join(',');
    // console.log('otherValue:', otherLigandsValue); //todo delete
    // 使用es6 FormData 传文件
    formData.append('job_name', form.job_name.trim());
    formData.append('other_ligands', otherLigandsValue);
    formData.append('res_chain', form.res_chain.trim());
    formData.append('res_ligand_chain', form.res_ligand_chain.trim());
    formData.append('res_ligand_ID', form.res_ligand_ID.trim());
    formData.append('res_ligand_name', form.res_ligand_name.trim());
    formData.append('design_ligand_name', form.design_ligand_name.trim());
    formData.append('protein', this.proteinFile);
    formData.append('ligand', this.ligandFile);
    // console.log('formData:', formData); // todo delete;
    this.rest.postData('first-step/', formData)
      .subscribe(data => {
        // this.paramsFileList = data;
        // console.log('fileList:', data); // todo delete
        alert('Submitted Successfully!');
      },
          error => {
          console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
          this.router.navigate(['./manual-design/manual-design/step-one-result'], {
            queryParams: {
              jobName: form.job_name
            }});
        });
  }

  stringToTitleCase(str: string): string {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

}
