import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private restHost = `${environment.REST_HOST}`;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {

  }

  public postData(url: string, body: any): Observable<any> {
    this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/api/${url}`, body)
      .pipe(finalize(() => {
        this.globalService.setLoading(false);
      }),
        catchError(this.handleError));
  }

  public getData(url: string): Observable<any> {
    return this.http.get(`${this.restHost}/api/${url}`);
    // todo add handle error
  }

  public getDataTest(url: string): Observable<any> {
    // const header  = new HttpHeaders();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'chemical/x-pdb'),
      responseType: 'blob'
    };
    return this.http.get(url,
      {
      // headers: new HttpHeaders().set('Content-Type', 'chemical/x-pdb'),
      responseType: 'blob'
    }
    );     // todo delete
  }

  public getFileText(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'});
  }

  private handleError(error: HttpErrorResponse | any ) {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      this.globalService.setLoading(false);
      errMsg = `${error.status} - ${error.statusText || ''} ${error}`;

    } else {
      this.globalService.setLoading(false);
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);
    return Promise.reject(errMsg);
  }

}
