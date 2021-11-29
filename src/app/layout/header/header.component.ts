import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Entreprendre ensemble';
  connected = false; //todo change that when user is connected
  constructor() { }

  ngOnInit() {

  }

}
