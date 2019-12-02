import { Component, OnInit } from '@angular/core';
import { PresentationControllerService } from '../slide-viewer/presentation-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  presentationRequest;
  constructor(private presentationControllerServive: PresentationControllerService) { }

  ngOnInit() {
  }
  startPresentation(url) {
    this.presentationRequest = new PresentationRequest([url]);
    this.presentationControllerServive.startPresentationRequest('http://localhost:4200/img-viewer');
  }
  changePresentation() {
    const message = { url: '/assets/start.html'};
    this.presentationControllerServive.sendMessage(message);
  }
}
