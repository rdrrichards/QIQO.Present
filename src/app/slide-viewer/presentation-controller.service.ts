import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresentationControllerService {
  presentationRequest: any;
  presentationConnection: any;
  constructor() { }
  createPresentationRequest(url) {
    this.presentationRequest = new PresentationRequest([url]);
    // Make this presentation the default one when using the "Cast" browser menu.
    navigator.presentation.defaultRequest = this.presentationRequest;
    this.presentationRequest.getAvailability()
      .then(availability => {
        console.log('Available presentation displays: ' + availability.value);
        availability.addEventListener('change', () => {
          console.log('> Available presentation displays: ' + availability.value);
        });
      })
      .catch(error => {
        console.log('Presentation availability not supported, ' + error.name + ': ' +
          error.message);
      });
  }

  startPresentationRequest(url) {
    console.log('Starting presentation request...');
    if (!this.presentationRequest) {
      this.createPresentationRequest(url);
      this.wirePresentationRequest();
    }
    this.presentationRequest.start()
      .then(connection => {
        console.log('> Connected to ' + connection.url + ', id: ' + connection.id);
      })
      .catch(error => {
        console.log('> ' + error.name + ': ' + error.message);
      });
  }

  wirePresentationRequest() {
    this.presentationRequest.addEventListener('connectionavailable', (event: any) => {
      this.presentationConnection = event.connection;
      this.presentationConnection.addEventListener('close', () => {
        console.log('> Connection closed.');
      });
      this.presentationConnection.addEventListener('terminate', () => {
        console.log('> Connection terminated.');
      });
      this.presentationConnection.addEventListener('message', (evnt: any) => {
        console.log('> ' + evnt.data);
      });
    });
  }

  sendMessage(thing) {
    const lang = document.body.lang || 'en-US';
    console.log('Sending', JSON.stringify(thing));
    this.presentationConnection.send(JSON.stringify({ thing, lang }));
  }

  closePresentationRequest() {
    console.log('Closing connection...');
    this.presentationConnection.close();
  }

  terminatePresentationRequest() {
    console.log('Terminating connection...');
    this.presentationConnection.terminate();
  }

  reconnect() {
    const presentationId = localStorage.getItem('presentationId');
    this.presentationRequest.reconnect(presentationId)
      .then(connection => {
        console.log('Reconnected to ' + connection.id);
      })
      .catch(error => {
        console.log('Presentation.reconnect() error, ' + error.name + ': ' + error.message);
      });
  }
}
