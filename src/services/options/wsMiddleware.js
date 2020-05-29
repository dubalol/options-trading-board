import * as actions from './actions';

const socketMiddleware = () => {
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
    const msg = JSON.parse(payload.data);

    switch (msg.type) {
      case 'book_top':
        if (store.getState().isInitiallySet) store.dispatch(actions.updateBookTop(msg));
        break;
      default:
        break;
    }
  };

  // Middleware
  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // Connect to host
        socket = new WebSocket(`${action.host}`);

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