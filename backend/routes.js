const Router = require("koa-router");
const { SPACES } = require("./constants");

const routeSpaces = SPACES.join("|");

const router = new Router();

const spaceFeatureRoutes = [
  require("./features/proposals/routes"),
];

const commonFeatureRouters = [
  require("./features/spaces/routes"),
];

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of spaceFeatureRoutes) {
    router.use(
      `/:chain(${routeSpaces})`,
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }
  app.use(router.routes());
};
