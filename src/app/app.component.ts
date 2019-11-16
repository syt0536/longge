import { Component } from '@angular/core';
import {RestService} from './service/rest/rest.service';
import {GlobalService} from './service/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  file: File;
  fileReadResult: any;
  loadingStatus: boolean;
  constructor(private globalService: GlobalService) {
    this.globalService.loadingStatus$
      .subscribe(status => {
        this.loadingStatus = status;
      });
  }

  fileChange(event) {
    console.log('event', event);
    this.file = event.target.files[0];
    this.readFile(this.file)
      .then((result) => {
         this.fileReadResult = result;
         console.log(result);
      });
    console.log('fileReadResult1:', this.fileReadResult); // todo delete
  }


  readFile(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        console.log('this.result', this.result, 'reader.result:', reader.result);
        resolve(this.result);
      };
    });
  }
}

