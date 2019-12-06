export function signInRequest(id) {
  return {
    type: '@user/SIGN_IN_REQUEST',
    payload: {id},
  };
}

export function signInSuccess(user) {
  return {
    type: '@user/SIGN_IN_SUCCESS',
    payload: {user},
  };
}

export function singFailure() {
  return {
    type: '@user/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@user/SIGN_OUT',
  };
}
