require("dotenv").config();

const { createChainApis } = require("./apis");

async function main() {
  await createChainApis()
}

main()
  .then(() => console.log('api initialized'))
  .catch(e => console.error(e))
