import { Component, OnInit, HostListener } from '@angular/core';
import { ImgViewerService } from './img-viewer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PresentationReceiverService } from '../slide-viewer/presentation-receiver.service';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.css']
})
export class ImgViewerComponent implements OnInit {
  url: SafeResourceUrl;
  constructor(private presentationReceiverService: PresentationReceiverService,
              private imgViewerService: ImgViewerService, private sanitizer: DomSanitizer) {
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/home');
              }

  ngOnInit() {
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/home');
    this.presentationReceiverService.receiverReady();
    this.presentationReceiverService.url$.subscribe(u =>
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(u)
      );
  }
  // @HostListener('DOMContentLoaded') domLoaded() {
  //   console.log('domLoaded', window.navigator.presentation.defaultRequest);
  //   if (window.navigator.presentation.receiver) {
  //     window.navigator.presentation.receiver.connectionList.then(list => {
  //       // list.connections.map(connection => addConnection(connection));
  //       list.addEventListener('connectionavailable', (event) => {
  //         receiver.addConnection(event.connection);
  //       });
  //     });
  //   }
  // }
}
