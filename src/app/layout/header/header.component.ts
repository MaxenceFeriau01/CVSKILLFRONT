import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Entreprendre ensemble';
  connected = false; //todo change that when user is connected
  constructor( private router:Router) { }

  ngOnInit() {

  }
  

}
