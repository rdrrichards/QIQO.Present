import { Component, OnInit } from '@angular/core';
import { PresentationControllerService } from '../slide-viewer/presentation-controller.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  phcLink: SafeResourceUrl;
  constructor(private presentationControllerServive: PresentationControllerService, private sanitizer: DomSanitizer) {
    this.phcLink = this.sanitizer.bypassSecurityTrustResourceUrl('PHC:123456;11-11-123456;GRM;RR1');
  }

  ngOnInit() {
  }
  startPresentation(url: string = null) {
    this.presentationControllerServive.startPresentationRequest('http://localhost:4200/img-viewer');
  }
  changePresentation() {
    const message = { url: '/assets/start.html'};
    this.presentationControllerServive.sendMessage(message);
  }
  changePresentationAgain() {
    const message = { url: '/assets/end.html'};
    this.presentationControllerServive.sendMessage(message);
  }
  endPresentation() {
    this.presentationControllerServive.closePresentationRequest();
  }
  termPresentation() {
    this.presentationControllerServive.terminatePresentationRequest();
  }
  openApp() {
    location.href = 'PHC:123456;11-11-123456;GRM;RR1';
  }
}
