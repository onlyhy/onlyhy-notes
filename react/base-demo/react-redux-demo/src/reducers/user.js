import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
} from "../constants";
const initialState = {
  user: {},
  isFetching: false,
  error: null,
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      // state.push("hy");
      // 此处如果直接返回state，是不会重新渲染的，
      // 不能直接操作state(三大原则之一，state是只读的，唯一改变state的方法就是触发action)
      // https://blog.csdn.net/za_az/article/details/56483261
      // return [...state];
      return {
        user: action.user,
      };
    case FETCH_USER_REQUEST:
      return {
        user: {},
        error: null,
        isFetching: true,
      };
    case FETCH_USER_FAILURE:
      return {
        user: {},
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
export default user;
