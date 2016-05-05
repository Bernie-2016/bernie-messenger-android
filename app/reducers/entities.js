import * as Types from '../actions/types';
import {Schemas, entitiesFromResponse} from '../entities/schemas';

const initialState = {
  assignment: {},
  contact: {}
};

const actionTypeToSchema = {
  [Types.GET_ASSIGNMENTS]: Schemas.Assignment,
  [Types.GET_CONTACTS]: Schemas.Contact
};

export default function entityReducer (state = initialState, action) {
  var entityType = actionTypeToSchema[action.type];
  var entities = {};
  if (!entityType || action.status !== 'success') {
    return state;
  }

  entities = entitiesFromResponse(action.response, entityType);
  return Object.keys(state).reduce((next, type) => ({
    ...next,
    [type]: {
      ...state[type],
      ...entities[type]
    }
  }), {});
}
