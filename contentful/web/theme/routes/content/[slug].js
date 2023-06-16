import Content from "theme/pages/Content";

export default Content;

const ONE_HOUR = 60 * 60;
Content.cacheControlDefinition = {
  sMaxAge: ONE_HOUR,
  staleWhileRevalidate: ONE_HOUR * 24,
};
