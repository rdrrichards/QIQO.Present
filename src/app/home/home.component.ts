import { Component, OnInit } from '@angular/core';
import * as controller from '../../assets/presentationController';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  startPresentation() {
    controller.startPresentationRequest('http://localhost:4200/img-viewer');
  }
  changePresentation() {
    const message = { url: '/assets/start.html'};
    controller.sendMessage(message);
  }
}
