const Router = require("koa-router");

const router = new Router();

const chainFeatureRouters = [
  require("./features/balance/routes"),
  require("./features/proxy/routes"),
  require("./features/chain/routes"),
];

const tokenRoutes = require("./features/token/routes");
const evmRoutes = require("./features/evm/routes");
const { evmChains } = require("./features/evm/providers");
const issuanceRoutes = require("./features/issuance/routes");

const commonFeatureRouters = [];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of chainFeatureRouters) {
    router.use(
      "/:chain(kusama|polkadot|karura|khala|statemine|bifrost|kintsugi|polkadex)",
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }

  router.use(
    "/:chain(statemine|karura|bifrost)",
    tokenRoutes.routes(),
    tokenRoutes.allowedMethods({ throw: true })
  );

  router.use(
    `/evm/chain/:chain(${Object.keys(evmChains).join("|")})`,
    evmRoutes.routes(),
    tokenRoutes.allowedMethods({ throw: true })
  );

  router.use(
    "/issuance",
    issuanceRoutes.routes(),
    issuanceRoutes.allowedMethods({ throw: true })
  );

  app.use(router.routes());
};
