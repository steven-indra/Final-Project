import { Component } from '@angular/core';
import { RefreshService } from './refresh.service';

@Component({
  selector: 'ea-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {

  constructor(private refreshService: RefreshService) { }

  add() {
    this.refreshService.notifyOther({ option: 'refreshSelected', value: 'add' });
  }
}
