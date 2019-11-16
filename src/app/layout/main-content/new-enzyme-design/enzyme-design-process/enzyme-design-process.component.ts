import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {JsmeComponent} from '../../../../shared/jsme/jsme/jsme.component';
import {RestService} from '../../../../service/rest/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enzyme-design-process',
  templateUrl: './enzyme-design-process.component.html',
  styleUrls: ['./enzyme-design-process.component.css']
})
export class EnzymeDesignProcessComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  newEnzymeDesignForm: FormGroup;
  proteinFile: File;
  fileReadResult: any;
  formData = new FormData();
  restHost = environment.REST_HOST;
  blob = new Blob();
  other_ligands: any;
  reactive_residue: any;
  fix_residues_list: any;
  reactionTypes = ['Michael Addition', 'Nucleophilic Addition to a Double Bond',
  'Nucleophilic Addition to a Triple Bond', 'Nucleophilic Substitution', 'Boronic Acid Addition',
  'Epoxide Opening', 'Imine Condensation', 'Phosphonate Addition', 'Beta Lactam Addition',
  'Conjugate Addition to Alkene (nitrile activated)', 'Conjugate Addition to Alkyne (carbonyl activated)',
  'Conjugate Addition to Alkyne (aryl activated)', 'Disulfide Formation', 'Ion Pair to Covalent Bond: Lig(-1)/Rec(+1)',
  'Ion Pair to Covalent Bond: Lig(+1)/Rec(-1)'];
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private router: Router) {

  }

  ngOnInit() {
    // this.jsmeSmiles = '';
    this.jsmeSmiles = 'CNCC(O)c1ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c1';
    // other_ligand 三个参数为一小组，可以有多组
    this.other_ligands = {
      params1: ['', [Validators.required]],
      params2: ['', [Validators.required]],
      params3: ['', [Validators.required]]
    };
    this.reactive_residue = {
      residue: ['', [Validators.required]],
      num: ['', [Validators.required]]
    };

    // fix_residues_list 四个参数，没两个参数为一组，可以有多组
    this.fix_residues_list = {
      fix_residue1: ['', [Validators.required]],
      fix_num1: ['', [Validators.required]],
      fix_residue2: ['', [Validators.required]],
      fix_num2: ['', [Validators.required]]
    };

    this.newEnzymeDesignForm = this.fb.group({
      job_name: ['', [Validators.required]],
      ligand: ['', [Validators.required]],
      smarts: ['', [Validators.required]],
      res_chain: ['', [Validators.required]],
      other_ligands: this.fb.array([this.fb.group(this.other_ligands)]),
      reactive_residue: this.fb.array([this.fb.group(this.reactive_residue)]),
      fix_residues_list: this.fb.array([this.fb.group(this.fix_residues_list)]),
      reaction_type: ['Michael Addition', [Validators.required]],
      user_email: ['', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)]]
    });
  }

  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }

  // 或去 other_ligands参数的值
  get otherLigands(): FormArray {
    return this.newEnzymeDesignForm.get('other_ligands') as FormArray;
  }
  // 添加other_ligands参数
  addOtherLigand() {
    this.otherLigands.push(this.fb.group(this.other_ligands));
    console.log('other_ligands:', this.otherLigands.value); // todo delete
  }
  // 移除 other_ligands参数
  removeOtherLigand() {
    this.otherLigands.controls.pop();
  }

  get fixResiduesList(): FormArray {
    return this.newEnzymeDesignForm.get('fix_residues_list') as FormArray;
  }

  addFixResiduesList() {
    this.fixResiduesList.push(this.fb.group(this.fix_residues_list));
    console.log('fix_residues_list:', this.fixResiduesList.value);
  }

  removeFixResuduesList() {
    this.fixResiduesList.controls.pop();
  }

  get reactiveResidues() {
    return this.newEnzymeDesignForm.get('reactive_residue') as FormArray;
  }

  proteinFileChange(event) {
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
        // console.log('this.result', this.result, 'reader.result:', reader.result);
        resolve(this.result);
      }; // todo add reject
    });
  }

  formSubmit() {
    // 表单验证不通过错误提示
    if (!this.proteinFile || !this.isPdbFile(this.proteinFile)) {
      alert('please input pdb format file!');
    } else if (this.newEnzymeDesignForm.invalid) {
      for (const i in this.newEnzymeDesignForm.controls) {
        this.newEnzymeDesignForm.controls[i].markAsDirty();
        this.newEnzymeDesignForm.controls[i].updateValueAndValidity();
      }
      if (this.otherLigands.invalid) {
        alert('please input the complete other ligand parameters!');
      } else if (this.fixResiduesList.invalid) {
        alert('please input the complete fix residues list!');
      }
    } else {
      // console.log('wenjianshangchuan!');
      this.uploadFile();
    }
  }


  uploadFile() {
    const form = this.newEnzymeDesignForm.value;
    const otherLigandsArray = [];
    const fixResiduesList = [];
    const reactiveResidueArray = [];
    // otherLiands
    for (const ligand of this.otherLigands.value) {
      otherLigandsArray.push(ligand['params1'].trim(), ligand['params2'].trim(), ligand['params3'].trim());
      // console.log('otherArray:', otherLigandsArray); // todo delete
    }
    const otherLigandsValue = '[' + otherLigandsArray.join(',') + ']';

    // fixResiduesList
    for (const fixResidue of this.fixResiduesList.value) {
      fixResiduesList.push(
        fixResidue['fix_residue1'].trim(),
        fixResidue['fix_num1'].trim(),
        fixResidue['fix_residue2'].trim(),
        fixResidue['fix_num2'].trim());
    }
    const fixResiduesListValue = '[' + fixResiduesList.join(',') + ']';

    for (const reactiveResidue of this.reactiveResidues.value) {
      reactiveResidueArray.push(reactiveResidue['residue'].trim(), reactiveResidue['num'].trim());
    }
    const reactiveResiduesValue = reactiveResidueArray.join(':');

    // 使用es6 FormData 传文件
    this.formData.append('job_name', form.job_name.trim());
    this.formData.append('ligand_design', form.ligand.trim());
    this.formData.append('smarts', form.smarts.trim());
    this.formData.append('other_ligands', otherLigandsValue);
    this.formData.append('protein', this.proteinFile);
    this.formData.append('res_chain', form.res_chain);
    this.formData.append('reactive_residue', reactiveResiduesValue);
    this.formData.append('fix_residues_list', fixResiduesListValue);
    this.formData.append('reaction_type', form.reaction_type);
    this.formData.append('email', form.user_email);
    // todo 修改路由和上传的地址
    this.rest.postData('covalent_design/', this.formData)
      .subscribe(data => {
          // this.paramsFileList = data;
          console.log('fileList:', data); // todo delete
          alert('Submitted Successfully!');
        },
        error => {
          console.log(error.message);
          alert('Submitted Failed!');
        },
        () => {
          this.router.navigate(['./home']);
        });
  }


}
