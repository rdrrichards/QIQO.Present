import { Component, OnInit, HostListener } from '@angular/core';
import { ImgViewerService } from './img-viewer.service';
import * as receiver from '../../assets/presentationReceiver';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.css']
})
export class ImgViewerComponent implements OnInit {
  url = '';
  constructor(private imgViewerService: ImgViewerService) { }

  ngOnInit() {
    receiver.receiverReady();
  }
  // @HostListener('DOMContentLoaded') domLoaded() {
  //   if (navigator.presentation.receiver) {
  //     navigator.presentation.receiver.connectionList.then(list => {
  //       // list.connections.map(connection => addConnection(connection));
  //       list.addEventListener('connectionavailable', (event) => {
  //         // addConnection(event.connection);
  //       });
  //     });
  //   }
  // }
}
