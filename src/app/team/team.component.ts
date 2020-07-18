import { Component, OnInit } from '@angular/core';
import { TeamDTO } from '../shared/model/team.model';
import { TeamService } from './../shared/service/team.service';
import { PlayerDTO, RoleCountDTO } from '../shared/model/player.model';
import { GoogleChartInterface, ChartSelectEvent } from '../../../node_modules/ng2-google-charts/public-api';
import { Subscriber } from '../../../node_modules/rxjs/index';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {

  constructor(private teamService: TeamService,
    private SpinnerService: NgxSpinnerService) {  }

  selectedTeam: string = "";
  teams: TeamDTO[] = [];
  pieChartData: any;
  barChartData: any;

  ngOnInit() {
    this.getTeamDetails();
  }

  getTeamDetails() {
    this.SpinnerService.show();
    this.teamService.getTeams().subscribe(res => {
      this.teams = res;
      let data: any = [["label", "city", "home", "coach", "team"]];
      for (let t of this.teams) {
        data.push([t.label, t.city, t.home, t.coach, t.team]);
      }
      this.SpinnerService.hide();
    });
  }

  public barChart: GoogleChartInterface = {
    chartType: 'Bar',
    dataTable: this.barChartData,
    options: {
      chart: {
        title: 'Teams'
      }
    }
  };
    
  viewBarChart() {
    this.barChart.dataTable = this.barChartData;
    this.barChart.options = { 'title': `${this.selectedTeam}: Team`, 'width': 600, 'height': 400 }
    let cchart = this.barChart.component;
 //   let ccWrapper = cchart.wrapper;
    cchart.wrapper.setDataTable(this.barChart.dataTable);
    cchart.draw();
  }

  select(event: ChartSelectEvent) {
    this.SpinnerService.show();
    let role = event.selectedRowFormattedValues[0];
    this.teamService.getTeamsByAmount().subscribe(res => {
      this.teams = res;
      let data: any = [["Label", "Team", "City", "Coach", "Home"]];
      for (let t of this.teams) {
        data.push([t.label, t.team, t.city, t.coach, t.home]);
      }
      this.SpinnerService.hide();
      this.pieChartData = data;
      this.viewPieChart();
    })
  }

  public pieChart: GoogleChartInterface = {
    chartType: 'Table',
    dataTable: this.pieChartData,
    options: { allowHtml: true, 'title': 'Team'}
  }

  viewPieChart() {
    this.pieChart.dataTable = this.pieChartData;
    let cchart = this.pieChart.component;
   // let ccWrapper = cchart.wrapper;
    cchart.wrapper.setDataTable(this.barChart.dataTable);
    cchart.draw();
  }
}




