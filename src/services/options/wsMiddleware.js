import * as actions from './actions';

const socketMiddleware = () => {
  // console.log('middleware function is invoked')
  let socket = null;

  const onOpen = store => (event) => {
    console.log('websocket open', event.target.url);
    store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    // console.log('event data: ', payload);
    const msg = JSON.parse(payload.data);

    switch (msg.type) {
      case 'book_top':
        store.dispatch(actions.updateBookTop(msg));
        break;
      default:
        break;
    }
  };

  // the middleware part of this function
  return store => next => action => {
    // console.log('mw return invoked')
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(`${action.host}`);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_TRANSACTION':
        // Consider posting transactions here
        // Or chat room messages if socket middleware was repurposed
        break;
      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();