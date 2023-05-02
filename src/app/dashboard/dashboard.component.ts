import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import links from './nav-items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  links = links;

  constructor(
    private dialog: MatDialog
  ) { }
}
