import * as Type from '../actions/types';

const initialState = {
  assignment: null,
  contact: null,
  called: false,
  texted: false,
  confirmCall: false
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
      //    case Type.CALL_CONTACT:
      //return {
      // ...state,
      //  called: true
      //};
    case Type.TEXT_CONTACT:
      return {
        ...state,
        texted: true
    };
    case Type.SHOW_CALL_CONFIRM:
      return {
        ...state,
        confirmCall: true
      };
    case Type.CALL_CONFIRMED:
      return {
      ...state,
      called: true,
      confirmCall: false
    };
    case Type.CALL_UNCONFIRMED:
      return {
      ...state,
      called: false,
      confirmCall: false
    };
    case Type.RESET_ASSIGNMENT:
      return initialState;
    default:
      return state;
  }
}
