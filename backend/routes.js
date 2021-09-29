const Router = require("koa-router");
const spaceServices = require("./spaces");

const routeSpaces = Object.keys(spaceServices).join("|");

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
      `/:space(${routeSpaces})`,
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }
  app.use(router.routes());
};
