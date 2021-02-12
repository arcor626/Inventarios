import { Component} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
  })
  export class DashboardComponent {
    public barChartOptions: any = {
      scaleShowVerticalLines: true,
      responsive: true
    };

    public barChartLabels: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    public barChartType = 'bar';
    public barChartLegend = true;


    public barChartData: any[] = [
      {data: [28, 48, 40, 19, 86, 27, 30], label: 'Mobiliario',
        backgroundColor: [
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)'
        ],
        borderColor: [
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)'
        ],
        borderWidth: 2,
      hoverBorderWidth: 0,
      hoverBackgroundColor: [
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)'
        ]
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Comunicacion' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Hardware' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Accesorios' }
    ];


    public barChartLabelsE: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    public barChartTypeE = 'bar';
    public barChartLegendE = true;


    public barChartDataE: any[] = [
      {data: [28, 48, 40, 19, 86, 27, 30], label: 'Mobiliario E',
        backgroundColor: [
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)'
        ],
        borderColor: [
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)',
          'rgba(39, 89, 149, 1)'
        ],
        borderWidth: 2,
      hoverBorderWidth: 0,
      hoverBackgroundColor: [
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)',
          'rgba(75, 115, 201, 0.6)'
        ]
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Comunicacion E' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Hardware E' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Accesorios E' }
    ];

  }

