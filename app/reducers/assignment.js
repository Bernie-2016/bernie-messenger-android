import * as Type from '../actions/types';

const initialState = {
  assignment: null,
  contact: null,
  contactNumber: null
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
        contact: action.contact,
        contactNumber: action.number
      };
    case Type.RESET_ASSIGNMENT:
      return initialState;
    default:
      return state;
  }
}
