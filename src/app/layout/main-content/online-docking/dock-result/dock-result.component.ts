import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {GlobalService} from '../../../../service/global/global.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Onlinedock} from '../../../../model/onlinedock';

@Component({
  selector: 'app-dock-result',
  templateUrl: './dock-result.component.html',
  styleUrls: ['./dock-result.component.css']
})
export class DockResultComponent implements OnInit {
  onlinedock: Onlinedock;
  prePovFileText: Text;
  mutPovFileText: Text;
  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit() {
    this._getOnlinedockResult();
  }

  private _getOnlinedockResult() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const jobName = params.get('jobName');
      this.rest.getData(`onlinedockparams/?filter{job_name}=${jobName}`)
        .subscribe(data => {
          this.onlinedock = data['onlinedocks'][0];
          this._getMutPovFileText();
          this._getPrePovFileText();
        });
    });
  }

  _getPrePovFileText(): void {
    this.rest.getFileText(`${this.onlinedock.prep_pov}`)
      .subscribe(data => {
        this.prePovFileText = data;
      });
  }

  _getMutPovFileText(): void {
    this.rest.getFileText(`${this.onlinedock.mut_pov}`)
      .subscribe(data => {
         this.mutPovFileText = data;
      });
  }

  gohome() {
    this.router.navigate(['./home']);
  }

}
