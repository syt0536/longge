import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-online-docking',
  templateUrl: './online-docking.component.html',
  styleUrls: ['./online-docking.component.css']
})
export class OnlineDockingComponent implements OnInit {
  dockingForm: FormGroup;
  proteinFile: File;
  fileReadResult: any;
  mutation: any;
  searchJobName: string;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) {
    this.mutation = {
      chain: ['', [Validators.required]],
      position: ['', Validators.required],
      residue: ['', Validators.required]
    };
  }

  ngOnInit() {
    this.dockingForm = this.fb.group({
      job_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)]],
      mutation_radius: ['', [Validators.required]],
      pov_radius: ['', [Validators.required]],
      pH: ['', [Validators.required]],
      mutation_info_list: this.fb.array([this.fb.group(this.mutation)]),
      ligand_name: ['', [Validators.required]],
      ligand_resseq: ['', [Validators.required]],
      chain_id: ['', [Validators.required]],
    });
  }

  get mutationInfoList(): FormArray {
   return this.dockingForm.get('mutation_info_list') as FormArray;
  }

  addMutation() {
    this.mutationInfoList.push(this.fb.group(this.mutation));
  }

  removeMutation() {
    this.mutationInfoList.controls.pop();
  }

  proteinFileChange(event) {
    this.proteinFile = event.target.files[0];
    if (!this.isPdbFile(this.proteinFile)) {
      alert('Please input pdb format protein file!');
    } else {
      this.readFile(this.proteinFile)
        .then((result) => {
          this.fileReadResult = result;
          console.log(result);
        });
      console.log('fileReadResult1:', this.fileReadResult); // todo delete
    }
  }

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const ispdbFormate = reg.test(file.name);
    return ispdbFormate;
  }

  readFile(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        console.log('this.result', this.result, 'reader.result:', reader.result);
        resolve(this.result);
      }; // todo add reject
    });
  }

  onSubmit() {
    if (!this.proteinFile || !this.isPdbFile(this.proteinFile)) {
      alert('Please input pdb format file');
    } else if (this.dockingForm.invalid) {
      for (const i in this.dockingForm.controls) {
        // console.log('stepForm:', this.dockingForm.controls);
        this.dockingForm.controls[i].markAsDirty();
        this.dockingForm.controls[i].updateValueAndValidity();
      }

      // mutation form array invalid
      if (this.mutationInfoList.invalid) {
        alert('Please input the complete mutation information!');
      }
    } else { // 表单提交给后台
     this.uploadForm();
    }
  }

  uploadForm() {
    const form  = this.dockingForm.value;
    const formData = new FormData();
    const mutationInfoArray = [];
    for (const mutation of form.mutation_info_list) {
      mutationInfoArray.push(
        mutation['chain'],
        mutation['position'],
        mutation['residue']
      );
    }
    const mutationInfoValue = '[' +  mutationInfoArray.join(',') + ']';
    formData.append('job_name', form.job_name);
    formData.append('email_addr', form.user_email);
    formData.append('mutation_radius', form.mutation_radius);
    formData.append('pov_radius', form.pov_radius);
    formData.append('pH', form.pH);
    formData.append('ligand_name', form.ligand_name);
    formData.append('ligand_resseq', form.ligand_resseq);
    formData.append('chain_id', form.chain_id);
    formData.append('mutation_info_list', mutationInfoValue);
    formData.append('protein_file', this.proteinFile);
    console.log('onlineData:', formData, this.dockingForm.value);
    this.rest.postData('online-dock/', formData)
      .subscribe(data => {
          console.log(data);
          alert('Submitted Successfully! The result will be sent to your email.');
        }, // TODO 提交上去就显示成功，不用等待
        error => {
          console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
          this.router.navigate(['./home']);
        });
  }


  gotoResult(): void {
    console.log(this.searchJobName);
    this.router.navigate(['mut-analysis/analysis-result'], {
      queryParams: {
        jobName: this.searchJobName
      }
    });
  }


}
