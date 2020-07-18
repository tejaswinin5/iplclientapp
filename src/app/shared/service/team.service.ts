import { Injectable } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/index';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeamDTO } from '../model/team.model';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  baseUrl = environment.baseurl;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(`${this.baseUrl}all`);
  }

  getTeamsByAmount(): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(`${this.baseUrl}totalamount`);
  }

}
