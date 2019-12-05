export function signRequest(email, password) {
  return {
    type: '@auth/SIGN_REQUEST',
    payload: { email, password }
  };
}

export function signSuccess(token, user) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: { token, user }
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT'
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE'
  };
}
