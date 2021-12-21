import { Component, ViewChild,OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-type-pie-chart',
  templateUrl: './type-pie-chart.component.html',
  styleUrls: ['./type-pie-chart.component.scss']
})
export class TypePieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        maxHeight:100
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartLegend = true;
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'fuel','food', 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
