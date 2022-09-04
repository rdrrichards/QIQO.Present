import { Component } from '@angular/core';
import { PresentationControllerService } from '../slide-viewer/presentation-controller.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  phcLink: SafeResourceUrl;
  constructor(private presentationControllerServive: PresentationControllerService, private sanitizer: DomSanitizer) {
    this.phcLink = this.sanitizer.bypassSecurityTrustResourceUrl('PHC:123456;11-11-123456;GRM;RR1');
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
  multiScreen() {
    const viewerWindow = window.open('http://localhost:4201?url=http://localhost:4244','targetWindow',
                                  `toolbar=no,
                                  location=no,
                                  status=no,
                                  menubar=no,
                                  scrollbars=yes,
                                  resizable=yes,
                                  width=500,
                                  height=500`)
    // if (window.screen.isExtended) {
    //   const screens = await window.getScreenDetails();
    //   console.log('screens', screens);
    //   // The Multi-Screen Window Placement API is supported.
    //   let granted = false;
    //   try {
    //     const { state } = await navigator.permissions.query({ name: 'window-placement' } as any);
    //     granted = state === 'granted';
    //   } catch {
    //     // Nothing.
    //   }
    //   if (granted && screens.screens.length > 0) {
    //     try {
    //       const primaryScreen = screens.screens.filter((screen) => screen.availWidth >= 2560)[0];
    //       console.log('primaryScreen', primaryScreen);
    //       await document.body.requestFullscreen({ screen: primaryScreen } as FullscreenOptions);
    //     } catch (err) {
    //       console.error('ERROR!', err.name, err.message, err);
    //     }
    //   }
    // }
  }
}
