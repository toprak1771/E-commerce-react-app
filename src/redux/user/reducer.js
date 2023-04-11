const defaultState = {
  data: {},
  login: false,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        data: action.data,
      };
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        login: action.data,
      };
    default:
      return state;
  }
};

export default userReducer