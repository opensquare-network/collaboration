const sleep = (seconds = 0) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * seconds));

export default sleep;
