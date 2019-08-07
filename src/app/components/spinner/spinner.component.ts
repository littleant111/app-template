import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input()
  spinnerType: string;

  constructor() {
    console.log('this.spinnerType1', this.spinnerType)
  }

  ngOnInit() {
    console.log('this.spinnerType2', this.spinnerType)
  }

}
