import Api from "./api";

export default new Api(
  new URL(
    `/api/`,
    process.env.REACT_APP_ENDPOINT ||
      "https://test-voting-api.opensquare.io/spaces"
  ).href
);
