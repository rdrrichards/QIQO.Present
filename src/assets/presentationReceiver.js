
export function receiverReady() {
  console.log('receiverReady', navigator.presentation.receiver);
  document.addEventListener('onloaded', function() {
    if (navigator.presentation.receiver) {
      navigator.presentation.receiver.connectionList.then(list => {
        list.connections.map(connection => addConnection(connection));
        list.addEventListener('connectionavailable', function(event) {
          addConnection(event.connection);
        });
      });
    }
  });
}

export function addConnection(connection) {
  console.log('addConnection connection.connectionId', connection.id);
  // connection.connectionId = ++connectionIdx;
  // addMessage('New connection #' + connectionIdx);

  connection.addEventListener('message', function(event) {
    console.log('message receiver event', event);
    const data = JSON.parse(event.data);
    // const logString = 'Message ' + messageIdx + ' from connection #' +
    //     connection.connectionId + ': ' + data.message;
    if (data.url) {
      window.location = data.url;
    }
    connection.send('Received message ' + data.url);
  });

  // connection.addEventListener('close', function(event) {
  //   addMessage('Connection #' + connection.connectionId + ' closed, reason = ' +
  //       event.reason + ', message = ' + event.message);
  // });
};
