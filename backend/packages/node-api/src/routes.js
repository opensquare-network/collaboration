const Router = require("koa-router");

const router = new Router();

const chainFeatureRouters = [
  require("./features/balance/routes"),
  require("./features/proxy/routes"),
  require("./features/chain/routes"),
  require("./features/democracy/routes"),
];

const tokenRoutes = require("./features/token/routes");
const tokenMetaRoutes = require("./features/tokenMeta/routes");
const evmRoutes = require("./features/evm/routes");
const issuanceRoutes = require("./features/issuance/routes");
const stafiRoutes = require("./features/stafi/routes");
const societyRoutes = require("./features/society/routes");
const { evmChains } = require("./constants");
const { chains } = require("./constants");

const commonFeatureRouters = [];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of chainFeatureRouters) {
    router.use(
      `/:chain(${Object.values(chains).join("|")})`,
      r.routes(),
      r.allowedMethods({ throw: true }),
    );
  }

  router.use(
    "/:chain(stafi)",
    stafiRoutes.routes(),
    stafiRoutes.allowedMethods({ throw: true }),
  );

  router.use(
    "/:chain(kusama)",
    societyRoutes.routes(),
    societyRoutes.allowedMethods({ throw: true }),
  );

  router.use(
    "/:chain",
    tokenMetaRoutes.routes(),
    tokenMetaRoutes.allowedMethods({ throw: true }),
  );

  router.use(
    "/:chain(statemine|statemint|karura|bifrost)",
    tokenRoutes.routes(),
    tokenRoutes.allowedMethods({ throw: true }),
  );

  router.use(
    `/evm/chain/:chain(${Object.values(evmChains).join("|")})`,
    evmRoutes.routes(),
    evmRoutes.allowedMethods({ throw: true }),
  );

  router.use(
    "/issuance",
    issuanceRoutes.routes(),
    issuanceRoutes.allowedMethods({ throw: true }),
  );

  app.use(router.routes());
};
