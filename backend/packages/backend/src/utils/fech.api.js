const fetch = require("node-fetch");

async function fetchApi(url, options) {
  const response = await fetch(url, options);
  const data = await response?.json();
  const errorMsg = data?.message || response?.status;
  if (!response?.ok) {
    throw new Error(errorMsg);
  }

  return data;
}

module.exports = {
  fetchApi,
};
