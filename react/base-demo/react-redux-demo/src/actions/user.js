import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
} from "../constants";

export function fetch_user_request() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

export function fetch_user_failure(error) {
  return {
    type: FETCH_USER_FAILURE,
    error,
  };
}

export function fetch_user(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function get_user() {
  return dispatch => {
    dispatch(fetch_user_request());
    fetch("http://iwenwiki.com/api/blueberrypai/getChengpinInfo.php")
      .then(res => res.json())
      .then(data => {
        dispatch(fetch_user(data.chengpinInfo[0]));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetch_user_failure(err));
      });
  };
}
