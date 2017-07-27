export default function ({ dispatch }) {
  return next => action => {
    if (!action.payload ||  !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then(response => dispatch({
        type: action.type,
        payload: response.data
      }))
      .catch(function (error) {
        console.log('action.payload', error.status, error.statusText);
      });
  };
}
