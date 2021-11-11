const Router = require("koa-router");

const router = new Router();

const chainFeatureRouters = [
  require("./features/balance/routes"),
  require("./features/proxy/routes"),
  require("./features/chain/routes"),
];

const commonFeatureRouters = [];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }
  for (const r of chainFeatureRouters) {
    router.use(
      "/:chain(kusama|polkadot|karura|khala)",
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }
  app.use(router.routes());
};
