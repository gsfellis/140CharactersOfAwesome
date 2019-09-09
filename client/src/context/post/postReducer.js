import { ADD_POST, GET_POSTS, CLEAR_POSTS } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};
