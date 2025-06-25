import Api from "./api";

const nextApi = new Api(
  new URL(
    "/",
    process.env.NEXT_PUBLIC_API_END_POINT || "https://test.opensquare.io/",
  ).href,
);

export const ssrNextApi = new Api(
  new URL(
    process.env.NEXT_PUBLIC_BACKEND_API_END_POINT ||
      "https://test.opensquare.io/",
  ).href,
);

export default nextApi;
