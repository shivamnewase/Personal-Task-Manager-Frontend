import { AuthType } from "../type";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload = {} } = action;
  //const { data } = payload;

  switch (type) {
    case AuthType.LOGIN:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case AuthType.LOGOUT:
      return {
        ...state,
        user: undefined,
        loading: false,
        error: null,
      };
      default: {
        return state;
      }
  }
};

export default authReducer;
