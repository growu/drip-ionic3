import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'
import * as moment from 'moment'
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@IonicPage({
    name: "goal-detail-chart",
    segment: 'goal/:id/chart'
})

@Component({
    selector: 'page-goal-detail-chart',
    templateUrl: 'goal-detail-chart.html',
})
export class GoalDetailChartPage {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public mode: string = "week";
    public item_id: number;
    public goal;

    public chartTitle: string = "";

    public prevValue = "";
    public nextValue = "";
    public currentValue:any = null;

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public chartLabels: any = [];
    public chartType: string = 'bar';
    public chartLegend: boolean = true;

    public chartColors: Array<any> = [{ // grey
        backgroundColor: '#488aff',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    public all_data;
    public current_data;

    @ViewChild('baseChart') private _chart;

    // public barChartColors:Array<any> = [];

    public chartData: any[] = [
        // {data: [], label: '打卡天数'}
    ];

    // events
    public chartClicked(e: any): void {
        console.log(e);
        if(e.active[0]) {
            let index:number = e.active[0]._index;
            setTimeout(()=>{
                this.current_data = this.all_data[index];
            },10);
        }
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider) {
        this.goal = this.navParams.get('goal');
        if(this.goal.items) {
            this.item_id = (this.goal.items)[0]['id'];
        }
    }

    ionViewDidLoad() {
        this.currentValue = moment().format("YYYY-MM-DD");
        this.getGoalsChart(moment().format("YYYY-MM-DD"));
    }

    getGoalsChart(day) {
        let id = this.navParams.data.id;
        this.userProvider.getGoalsChart(id, this.item_id,this.mode, day).then((response) => {

            // let chartData: any[] = [];
            // let chartLabels: any[] = [];
            this.nextValue = response.next;
            this.prevValue = response.prev;
            this.chartTitle = response.chart_title;
            this.all_data = response.all_data;
            this.chartData = response.chart_data;
            this.chartLabels = response.chart_labels;

            if(response.all_data.length > 0) {
                console.log(response.all_data.length);
                this.current_data = (response.all_data)[response.all_data.length-1];
            }

            let clone = JSON.parse(JSON.stringify(this.chartData));
            clone = response.chart_data;
            this.chartData = clone;

            let clone2 = JSON.parse(JSON.stringify(this.chartLabels));
            // clone2 = response.chartLabels;
            this.chartLabels = clone2;

            if(this.chart&&this.chart.chart) {
                setTimeout(() => {
                    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
                });
            }

        });
    }

    goPrev() {
        this.currentValue = this.prevValue;
        this.getGoalsChart(this.prevValue);
    }

    goNext() {
        this.currentValue = this.nextValue;
        this.getGoalsChart(this.nextValue);
    }

    onChangeItem(item_id) {
        // this.item_id = item_id;
        this.getGoalsChart(this.currentValue);
    }

    onChangeMode(mode) {
        // this.mode = mode;
        this.getGoalsChart(this.currentValue);
    }

    onChangeType(type) {
        // this.chartType = type;
        setTimeout(()=>{
            this.chart.chart.update();
        },10);
    }

}
