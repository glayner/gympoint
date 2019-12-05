import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  profile: null,
  signed: false,
  loading: false
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_SUCCESS': {
        draft.token = action.payload.token;
        draft.profile = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.profile = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
