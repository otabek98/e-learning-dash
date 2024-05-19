export const initialState = {
  token: localStorage.getItem("admin-token") || null,
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "register":
      action.payload !== undefined &&
        localStorage.setItem("admin-token", action.payload);
      return {
        token: action.payload,
      };

    case "logout":
      localStorage.removeItem("admin-token");
      return {
        token: null,
      };
    default:
      return state;
  }
};
