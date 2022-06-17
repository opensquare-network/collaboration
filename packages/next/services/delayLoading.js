import nextApi from "./nextApi";
import sleep from "../frontedUtils/sleep";

async function delayLoading(url) {
  return Promise.all([nextApi.fetch(url), sleep(2)]);
}

export async function delayPromise(promise) {
  return Promise.all([promise, sleep(2)]);
}

export default delayLoading;
