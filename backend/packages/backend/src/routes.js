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
  require("./features/space-members/routes"),
  require("./features/home/routes"),
  require("./features/clientErrors/routes"),
  require("./features/chain/routes"),
  require("./features/token/routes"),
  require("./features/files/routes"),
  require("./features/notifications/routes"),
  require("./features/proposals/commonRoutes"),
  require("./features/society/index"),
];

async function checkSpaceExistence(ctx, next) {
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
      "/:space",
      checkSpaceExistence,
      r.routes(),
      r.allowedMethods({ throw: true }),
    );
  }
  app.use(router.routes());
};
