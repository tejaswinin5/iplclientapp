import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { TeamLabelDTO, PlayerDTO, RoleCountDTO } from './../model/player.model';
import { Observable } from '../../../../node_modules/rxjs/index';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  
  baseUrl = environment.baseurl;
  constructor(private http: HttpClient) { }

  teamLabels(): Observable<TeamLabelDTO> {
    return this.http.get<TeamLabelDTO>(`${this.baseUrl}labels`);
  }

  getPlayersByTeam(teamName: string): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(`${this.baseUrl}${teamName}`);
  }

  getPlayerCountByTeam(teamName: string): Observable<RoleCountDTO[]> {
    return this.http.get<RoleCountDTO[]>(`${this.baseUrl}role/${teamName}`);
  }

  getPlayerByTeamAndRole(teamName: string, role: string): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(`${this.baseUrl}/${teamName}/${role}`);
  }
}
