import { Component, OnInit } from '@angular/core';
import { PlayerService } from './../shared/service/player.service';
import { PlayerDTO, RoleCountDTO } from '../shared/model/player.model';
import { ChartSelectEvent } from '../../../node_modules/ng2-google-charts/public-api';
import { GoogleChartInterface } from 'ng2-google-charts';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private playerService: PlayerService,
    private SpinnerService: NgxSpinnerService) { }

  teamLabels: string[] = [];
  selectedTeam: string = "";
  players: PlayerDTO[] = [];
  playerByRole: PlayerDTO[] = [];
  pieChartData: any;
  tableChartData: any;

  ngOnInit(): void {
    this.playerService.teamLabels().subscribe(res => {
      this.teamLabels = res.labels;
    })
  }

  fetchTeamDetails(teamName: string) {
    this.SpinnerService.show();
    if (teamName != null && teamName.length > 0) {
      this.selectedTeam = teamName;
      this.playerService.getPlayersByTeam(teamName).subscribe(res => {
        this.players = res;
        this.SpinnerService.hide();
      })
    }
    this.getPlayerCountByTeam();
    this.tableChartData = null;
  }

  getPlayerCountByTeam() {
    this.SpinnerService.show();
    this.playerService.getPlayerCountByTeam(this.selectedTeam).subscribe(res => {
      let roleCount: RoleCountDTO[] = res;
      let data = [];
      data.push(["Role", "Count"]);
      for (let r of roleCount) {
        data.push([r.roleName, r.count])
      }
      this.SpinnerService.hide();
      this.pieChartData = data;
      this.viewPieChart();
    })
  }

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: this.pieChartData,
    options: { 'title': `title`, 'width': 900, 'height': 500 }
  };

  viewPieChart() {
    this.pieChart.dataTable = this.pieChartData;
    this.pieChart.options = { 'title': `${this.selectedTeam}: Player count by Role`, 'width': 600, 'height': 400 };
    let cchart = this.pieChart.component;
   // let ccWrapper = cchart.wrapper;
    cchart.wrapper.setDataTable(this.pieChart.dataTable);
    cchart.draw();
  }

  select(event: ChartSelectEvent) {
    this.SpinnerService.show();
    let role = event.selectedRowFormattedValues[0];
    this.playerService.getPlayerByTeamAndRole(this.selectedTeam, role).subscribe(res => {
      this.playerByRole = res;
      let data: any = [["Name", "Label", "Role", "Price"]];
      for (let p of this.playerByRole) {
        data.push([p.name, p.label, p.role, p.price]);
      }
      this.SpinnerService.hide();
      this.tableChartData = data;
      this.viewTableChart();
    })
  }

  public tableChart: GoogleChartInterface = {
    chartType: 'Table',
    dataTable: this.tableChartData,
    options: {allowHtml: true, 'title':'Player Details by role'}
  }

  viewTableChart() {
    this.tableChart.dataTable = this.tableChartData;
    let cchart = this.tableChart.component;
   // let ccWrapper = cchart.wrapper;
    cchart.wrapper.setDataTable(this.pieChart.dataTable);
    cchart.draw();
  }
}


