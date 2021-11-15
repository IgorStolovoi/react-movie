export const getQueryString = (params) => {
  const arr = Object.entries(params).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => {
          return [key, val].join("=");
        })
        .join("&");
    }
    return [key, value].join("=");
  });
  return arr.join("&");
};
