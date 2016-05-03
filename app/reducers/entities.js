import * as Types from '../actions/types';
import {Schemas, entitiesFromResponse} from '../entities/schemas';

const initialState = {
  assignment: {},
  contacts: {}
};

const actionTypeToSchema = {
  [Types.GET_ASSIGNMENTS]: Schemas.Assignment
}

export default function entityReducer (state = initialState, action) {
  var entityType = actionTypeToSchema[action.type];
  if (!entityType || action.status !== 'success') {
    return state;
  }

  return mergeState({...state}, entitiesFromResponse(action.response, entityType));
}

function mergeState (state, entities) {
  for (let type in entities) {
    if (!state[type]) {
      state[type] = entities[type];
    } else {
      state[type] = {
        ...state[type],
        ...entities[type]
      };
    }
  }
  return state;
}
