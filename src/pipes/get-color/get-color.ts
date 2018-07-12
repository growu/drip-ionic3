import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the GetColorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'getColor',
})
export class GetColorPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    public colors = [
        {
            "name": "primary",
            "value": "#2196F3"
        },
        {
            "name": "purple",
            "value": "#6c5ce7"
        },
        {
            "name": "pink",
            "value": "#f368e0"
        },
        {
            "name": "yellow",
            "value": "#f39c12"
        },
        {
            "name": "secondary",
            "value": "#1dd1a1"
        },
        {
            "name": "rose",
            "value": "#e66767"
        },
        {
            "name": "danger",
            "value": "#F44336"
        },
        {
            "name": "dark",
            "value": "#2d3436"
        }
    ];

    public color:string = "#2196F3";

    transform(value: string, ...args) {

        this.colors.forEach((v) => {
            if (v.name == value) {
                this.color = v.value;
            }
        });

        return this.color;
    }
}
