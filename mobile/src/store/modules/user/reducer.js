import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case '@user/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@user/SIGN_OUT': {
        draft.profile = null;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
