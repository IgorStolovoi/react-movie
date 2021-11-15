const CHANGE_THEME = "Change-Theme";
export const changeTheme = () => ({
  type: CHANGE_THEME,
});
const initialState = {
  isLightTheme: true,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        isLightTheme: !state.isLightTheme,
      };

    default:
      return state;
  }
};
