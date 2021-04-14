import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SimpleResponse} from '../models/simpleResponse';

@Injectable({
  providedIn: 'root'
})
export class AvisualizerService {

  constructor(private httpClient: HttpClient) { }

  getWelComeMessage(): Observable<SimpleResponse>{
    return this.httpClient.get<SimpleResponse>('/rest');
  }

  // async generateJson(url:string, projectModel: ProjectModel){
  //   return await this.httpCliente.post<ProjectModel>(url, projectModel).toPromise();
  // }
  // //methods for local testing
  // getSystemView(){
  //   return "../../../reports/asniffer_results/SpaceWeatherTSI-SV.json";
  // }
  //
  // getPackageView(){
  //   return "../../../reports/asniffer_results/SpaceWeatherTSI-PV.json";
  // }
  //
  // getClassView(){
  //   return "../../../reports/asniffer_results/SpaceWeatherTSI-CV.json";
  // }
}
