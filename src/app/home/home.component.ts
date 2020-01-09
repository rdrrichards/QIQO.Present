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

  async ngOnInit() {
    // const screens = await window.getScreens();

    // for (const screen of screens) {
    //   // Properties specified in https://www.w3.org/TR/cssom-view/#screen
    //   console.log(screen.width);         // 1680
    //   console.log(screen.height);        // 1050
    //   console.log(screen.availWidth);    // 1680
    //   console.log(screen.availHeight);   // 1027
    //   console.log(screen.colorDepth);    // 24
    //   console.log(screen.pixelDepth);    // 24

    //   // Properties specified in https://www.w3.org/TR/screen-orientation
    //   console.log(screen.orientation);   // { type: "landscape-primary", ... }

    //   // NEW: Properties implemented by some browsers that should be standardized.
    //   // See MDN docs: https://developer.mozilla.org/en-US/docs/Web/API/Screen
    //   console.log(screen.left);          // 1680
    //   console.log(screen.top);           // 0
    //   console.log(screen.availLeft);     // 0
    //   console.log(screen.availTop);      // 23

    //   // NEW: Properties proposed here that should be standardized.
    //   console.log(screen.scaleFactor);   // 2
    //   console.log(screen.internal);      // false
    //   console.log(screen.primary);       // false (discernable from top/left)
    //   console.log(screen.name);          // "Screen 1" or "DELL P2715Q"
    //   console.log(screen.touchSupport);  // false
    // }
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
