const getImgSrc = (url: string) => {
  const image = new URL(url, import.meta.env.VITE_URL_IMAGE).href;
  return image;
};

export default getImgSrc;
