import {GET_ASSIGNMENTS} from '../actions/types';
import {idsFromResponse} from '../entities/schemas';

const initialState = {
  loading: true,
  assignments: []
};

export default function assignmentsReducer (state = initialState, action) {
  if (action.type !== GET_ASSIGNMENTS) {
    return state;
  }
  switch (action.status) {
    case 'request':
      return {
        ...state,
        loading: true
      };
    case 'success':
      return {
        ...state,
        loading: false,
        assignments: idsFromResponse(action.response)
      };
    case 'failure':
      return {
        ...state,
        loading: false,
        assignments: []
      };
    default:
      return state;
  }
}
