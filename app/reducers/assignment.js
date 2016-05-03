import * as Type from '../actions/types';

const initialState = {
  assignment: null,
  contact: null,
  called: false,
  texted: false
};

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case Type.SELECT_ASSIGNMENT:
      return {
        ...state,
        assignment: action.assignment
      };
    case Type.SELECT_CONTACT:
      return {
        ...state,
        contact: action.contact
      };
    case Type.CALL_CONTACT:
      return {
        ...state,
        called: true
      };
    case Type.TEXT_CONTACT:
      return {
        ...state,
        texted: true
      };
    case Type.RESET_ASSIGNMENT:
      return initialState;
    default:
      return state;
  }
}
