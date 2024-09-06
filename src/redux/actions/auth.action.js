import { AuthType } from "../type";
import { login } from "../API";
import { setAuthenticate } from "../API";

export const loginAction = (reqBody, navigate) => async (dispatch) => {
  const reqUpdatebody = { email: reqBody.username, password: reqBody.password };
  console.log("🚀 ~ loginAction ~ reqUpdatebody:", reqUpdatebody);
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
    navigate('/Home');
  } catch (error) {
    console.log("error", error);
  }
};
