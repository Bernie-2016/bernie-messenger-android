import * as Type from '../actions/types';

const initialState = {
  assignment: null
};

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case Type.SELECT_ASSIGNMENT:
      return {
        ...state,
        assignment: action.assignment
      };
    default:
      return state;
  }
}
