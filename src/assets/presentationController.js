let presentationRequest;

export function createPresentationRequest(url) {
  presentationRequest = new PresentationRequest([url]);
  presentationRequest.getAvailability()
  .then(availability => {
    console.log('Available presentation displays: ' + availability.value);
    availability.addEventListener('change', function() {
      console.log('> Available presentation displays: ' + availability.value);
    });
  })
  .catch(error => {
    console.log('Presentation availability not supported, ' + error.name + ': ' +
        error.message);
  });
}

// Make this presentation the default one when using the "Cast" browser menu.
navigator.presentation.defaultRequest = presentationRequest;

let presentationConnection;

export function startPresentationRequest(url) {
  console.log('Starting presentation request...');
  if (!presentationRequest) {
    createPresentationRequest(url);
    wirePresentationRequest();
  }
  presentationRequest.start()
    .then(connection => {
      console.log('> Connected to ' + connection.url + ', id: ' + connection.id);
    })
    .catch(error => {
      console.log('> ' + error.name + ': ' + error.message);
    });
}

function wirePresentationRequest() {
  presentationRequest.addEventListener('connectionavailable', function(event) {
    presentationConnection = event.connection;
    presentationConnection.addEventListener('close', function() {
      console.log('> Connection closed.');
    });
    presentationConnection.addEventListener('terminate', function() {
      console.log('> Connection terminated.');
    });
    presentationConnection.addEventListener('message', function(event) {
      console.log('> ' + event.data);
    });
  });
}

export function sendMessage(thing) {
  const lang = document.body.lang || 'en-US';
  console.log('Sending', JSON.stringify(thing));
  presentationConnection.send(JSON.stringify({thing, lang}));
}

export function closePresentationRequest() {
  console.log('Closing connection...');
  presentationConnection.close();
}

export function terminatePresentationRequest() {
  console.log('Terminating connection...');
  presentationConnection.terminate();
}

export function reconnect() {
  const presentationId = localStorage.getItem('presentationId');
  presentationRequest.reconnect(presentationId)
    .then(connection => {
      console.log('Reconnected to ' + connection.id);
    })
    .catch(error => {
      console.log('Presentation.reconnect() error, ' + error.name + ': ' + error.message);
    });
}

