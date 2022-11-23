const Router = require("koa-router");
const { spaces: spaceServices } = require("./spaces");

const router = new Router();

const spaceFeatureRoutes = [
  require("./features/proposals/routes"),
  require("./features/appendants/routes"),
  require("./features/accounts/routes"),
  require("./features/space-networks/routes"),
];

const commonFeatureRouters = [
  require("./features/spaces/routes"),
  require("./features/home/routes"),
  require("./features/chain/routes"),
  require("./features/files/routes"),
  require("./features/proposals/commonRoutes"),
];

async function checkSpaceExisten(ctx, next) {
  if (!spaceServices[ctx.params.space]) {
    return ctx.throw(404, "Space does not exists");
  }
  await next();
}

module.exports = (app) => {
  for (const r of commonFeatureRouters) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  for (const r of spaceFeatureRoutes) {
    router.use(
      `/:space`,
      checkSpaceExisten,
      r.routes(),
      r.allowedMethods({ throw: true })
    );
  }
  app.use(router.routes());
};
