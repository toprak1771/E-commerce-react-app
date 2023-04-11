import { setUserData } from './actions';
import { setInLogin } from './actions';

const updateUserData = (data) => {
  return async (dispatch) => {
    dispatch(setUserData(data));
  };
}
const updateLogin = (data) => {
  return async (dispatch) => {
    dispatch(setInLogin(data));
  };
}

export default {updateUserData,updateLogin}