import { AuthType } from "../type";
import { login, getUsersList } from "../API";
import { setAuthenticate } from "../API";

export const loginAction = (reqBody, navigate) => async (dispatch) => {
  const reqUpdatebody = { email: reqBody.username, password: reqBody.password };

  try {
    const loginResponse = await login(reqUpdatebody);

    if (loginResponse.status === 200) {
      const loginToken = loginResponse.data.token;
      if (loginToken) {
        localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
        localStorage.setItem("token", loginToken);
        setAuthenticate(loginToken);
      }
      dispatch({
        type: AuthType.LOGIN,
        payload: loginResponse.data.data,
      });
    }
    navigate("/");
  } catch (error) {
    console.log("error", error);
  }
};

export const getUsersListAction = () => async (dispatch) => {
  try {
    const getUserListResponse = await getUsersList();
   
    dispatch({ type: AuthType.USER_LIST, payload: getUserListResponse.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const logOutAction = () => async (dispatch) => {
  try {
    localStorage.clear();
    window.location.replace("/");
    dispatch({ type: AuthType.LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
