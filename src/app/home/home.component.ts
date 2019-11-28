import { Component, OnInit } from '@angular/core';
// import * as controller from '../../assets/presentationController';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
presentationRequest;
  constructor() { }

  ngOnInit() {
  }
  startPresentation(url) {
    this.presentationRequest = new PresentationRequest([url]);
    // controller.startPresentationRequest('http://localhost:4200/img-viewer');
  }
  changePresentation() {
    const message = { url: '/assets/start.html'};
    // controller.sendMessage(message);
  }
}
