import { Component, OnInit, HostListener } from '@angular/core';
import { ImgViewerService } from './img-viewer.service';
import * as receiver from '../../assets/presentationReceiver';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.css']
})
export class ImgViewerComponent implements OnInit {
  url: SafeResourceUrl;
  constructor(private imgViewerService: ImgViewerService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/home');
    receiver.receiverReady();
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
