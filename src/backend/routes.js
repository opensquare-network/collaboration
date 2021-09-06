const Router = require("koa-router");
const { SupportChians } = require("./constants");

const routeChains = SupportChians.join("|");

const router = new Router();

const chainFeatureRouters = [require("./features/posts/routes")];

const commonFeatureRouters = [require("./features/auth/routes")];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of chainFeatureRouters) {
    router.use(
      `/:chain(${routeChains})`,
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }
  app.use(router.routes());
};
