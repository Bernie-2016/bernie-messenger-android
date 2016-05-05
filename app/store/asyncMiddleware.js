export const STATUS_REQUEST = 'request';
export const STATUS_FAILURE = 'failure';
export const STATUS_SUCCESS = 'success';

export default function asyncActionMiddleware ({dispatch, getState}) {
  return next => action => {
    const {
      type,
      asyncAction,
      payload = {}
    } = action;

    if (typeof asyncAction !== 'function') {
      return next(action);
    }

    next({
      ...payload,
      type,
      status: STATUS_REQUEST
    });

    return asyncAction(getState())
      .then(dispatchSuccess(dispatch, type, payload))
      .catch(dispatchFailure(dispatch, type, payload));
  };
}

function dispatchSuccess (dispatch, type, payload) {
  return response => dispatch({
    type,
    payload,
    response,
    status: STATUS_SUCCESS
  });
}

function dispatchFailure (dispatch, type, payload) {
  return error => {
    dispatch({
      type,
      payload,
      error,
      status: STATUS_FAILURE
    });
    throw error;
  };
}
