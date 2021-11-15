const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const getCorrectImg = (path) => {
  return `${IMG_URL}${path}`;
};
