require("dotenv").config();

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");
const cors = require("@koa/cors");
const { createChainApis, logApiStatus } = require("./apis");

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
const server = http.createServer(app.callback());

async function main() {
  await createChainApis();
  setInterval(logApiStatus, 5 * 60 * 1000);

  const port = parseInt(process.env.SERVER_PORT) || 3223;
  server.listen(port, () =>
    console.log(`✅  The server is running at http://localhost:${port}/`)
  );
}

main()
  .then(() => console.log("api initialized"))
  .catch((e) => console.error(e));
