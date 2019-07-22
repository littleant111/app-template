import { Component } from '@angular/core';

import { LoggerService } from '../services/logger/logger.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private logger: LoggerService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.testLogger()
  }
  testLogger() {
    this.logger.debug('test logger: success!');
  }
}
