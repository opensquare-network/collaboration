const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const { reloadSpaces } = require("./spaces");
const socketSetup = require("./socket");
const spaceNotify = require("./scripts/space-notify");
const { validateEnv } = require("./utils/requireEnv");

validateEnv([
  "S3_API",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_BUCKET",
  "S3_PUBLIC_ENDPOINT",
]);

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(helmet());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
      data: err.data,
    };
  }
});

require("./routes")(app);

reloadSpaces();

const PORT = process.env.PORT;
if (!PORT) {
  console.log("PORT is not defined");
  process.exit();
}

const koaHandler = app.callback();
const httpServer = createServer(koaHandler);

httpServer.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://127.0.0.1:${PORT}`);
});

socketSetup(httpServer);
spaceNotify();
