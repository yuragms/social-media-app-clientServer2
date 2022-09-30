import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, user) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER_START" });
  try {
    const { data } = await UserApi.followUser(id, user);
    console.log("Action FOLLOW_USER_START data : ", data);
    dispatch({ type: "FOLLOW_USER_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "FOLLOW_USER_FAIL" });
  }
};

export const unFollowUser = (id, user) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_START" });
  try {
    const { data } = await UserApi.unFollowUser(id, user);
    dispatch({ type: "UNFOLLOW_USER_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UNFOLLOW_USER_FAIL" });
  }
};

//version ZainRk do not work if espire token
// export const followUser = (id, data) => async (dispatch) => {
//   dispatch({ type: "FOLLOW_USER" });
//   UserApi.followUser(id, data);
// };

// export const unFollowUser = (id, data) => async (dispatch) => {
//   dispatch({ type: "UNFOLLOW_USER" });
//   UserApi.unFollowUser(id, data);
// };
