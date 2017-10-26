import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'
import * as moment from 'moment'

@IonicPage({
    name: "goal-detail-chart",
    segment: 'chart'
})

@Component({
    selector: 'page-goal-detail-chart',
    templateUrl: 'goal-detail-chart.html',
})
export class GoalDetailChartPage {

    public mode: string = "week";
    public chartTitle: string = "";
    public chartCheckinCount: number = 0;
    public chartCheckinRate: number = 0;

    public prevValue = "";
    public nextValue = "";
    public currentValue:any = null;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: any = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartColors: Array<any> = [{ // grey
        backgroundColor: '#488aff',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // public barChartColors:Array<any> = [];

    public barChartData: any[] = [
        {data: [], label: '打卡次数'}
    ];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.currentValue = moment().format("YYYY-MM-DD");
        this.getData(moment().format("YYYY-MM-DD"));
    }

    getData(day) {
        let id = this.navParams.data.id;
        this.userProvider.getGoalChart(id, this.mode, day).then((response) => {

            let chartData: any[] = [];
            let chartLabels: any[] = [];
            this.chartTitle = response.title;
            this.nextValue = response.next;
            this.prevValue = response.prev;

            this.chartCheckinCount = response.checkin_count;
            this.chartCheckinRate = response.checkin_rate;

            var data = response.data;

            data.forEach((item, index) => {
                chartLabels.push(item.label);
                chartData.push(item.checkin_count);
            });

            let clone = JSON.parse(JSON.stringify(this.barChartData));
            clone[0].data = chartData;

            this.barChartData = clone;
            this.barChartLabels = chartLabels;
        });
    }

    public goPrev() {
        this.currentValue = this.prevValue;
        this.getData(this.prevValue);
    }

    public goNext() {
        this.currentValue = this.nextValue;
        this.getData(this.nextValue);
    }

    public changeMode($event) {
        this.barChartLabels = [];
        this.getData(this.currentValue);
    }

}
