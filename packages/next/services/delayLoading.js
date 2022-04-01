import nextApi from "./nextApi";

const delay = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

async function delayLoading(url) {
  return Promise.all([nextApi.fetch(url), delay]);
}

export default delayLoading;
