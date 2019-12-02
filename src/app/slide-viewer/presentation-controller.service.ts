import { Injectable } from '@angular/core';

const key = 'presentationId';

@Injectable({
  providedIn: 'root'
})
export class PresentationControllerService {
  presentationRequest: any;
  presentationConnection: any;
  constructor() { }

  startPresentationRequest(url: string) {
    console.log('Starting presentation request...');
    if (!this.presentationRequest) {
      this.createPresentationRequest(url);
      this.wirePresentationRequest();
    }
    this.presentationRequest.start()
      .then(connection => {
        console.log('> Connected to ' + connection.url + ', id: ' + connection.id);
        console.log('> Connected now connection info: ', connection);
        localStorage.setItem(key, connection.id);
        console.log('> startPresentationRequest navigator.presentation: ', navigator.presentation);
      })
      .catch(error => {
        console.log('> ' + error.name + ': ' + error.message);
      });
  }
  createPresentationRequest(url: string) {
    this.presentationRequest = new PresentationRequest([url]);
    // Make this presentation the default one when using the "Cast" browser menu.
    navigator.presentation.defaultRequest = this.presentationRequest;
    this.presentationRequest.getAvailability()
      .then(availability => {
        availability.addEventListener('change', () => {
          console.log('> Available presentation displays: ' + availability.value);
          console.log('> createPresentationRequest navigator.presentation: ', navigator.presentation);
        });
      })
      .catch(error => {
        console.log('Presentation availability not supported, ' + error.name + ': ' +
          error.message);
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
      console.log('> wirePresentationRequest this.presentationRequest info: ', this.presentationRequest);
      console.log('> wirePresentationRequest navigator.presentation: ', navigator.presentation);
    });
  }

  sendMessage(thing: any) {
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
    const presentationId = localStorage.getItem(key);
    this.presentationRequest.reconnect(presentationId)
      .then(connection => {
        console.log('Reconnected to ' + connection.id);
      })
      .catch(error => {
        console.log('Presentation.reconnect() error, ' + error.name + ': ' + error.message);
      });
  }
}
