import { AuthType } from "../type";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  userList: [],
  error: undefined,
};

const authReducer = (state = initialState, action) => {
  const { type, payload = {} } = action;
 

  switch (type) {
    case AuthType.LOGIN:
      return {
        ...state,
        user: payload,
        loading: false,
        error: undefined,
      };
    case AuthType.USER_LIST:
      return {
        ...state,
        userList: payload,
      };
    case AuthType.LOGOUT:
      return {
        ...state,
        user: undefined,
        loading: false,
        error: undefined,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
