# OpenSquare Collaboration

OpenSquare Collaboration is an off-chain gas free collaboration platform.
Currently, off chain voting has been implemented while bounties and paid questions are in the plan.

Off chain voting now support [substrate](https://github.com/paritytech/substrate) based chains and assets on Statemine/Statemint.

# Code structure

Code exists in 2 folders: [backend](./backend) and [next](./next). Backend is a yarn workspace containing 2 packages:

1. backend is a restful api server.
2. node-api serves apis to retrieve data by calling various chain RPCs.

Make sure [yarn](https://yarnpkg.com/) is installed before going ahead. [Next](./next) hosts fronted code based on [next.js](https://nextjs.org/).

## node-api

This package maintains multiple [@polkadot/api](https://github.com/polkadot-js/api) instances or ethers [JsonRpcProvider](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/)s
for target chains in case of a single endpoint failure. It is in charge of interaction with chain nodes and provides restful apis for caller to fetch on-chain data. The apis include:

- [chain]/balance/[address]/[blockHashOrHeight?]: get the address balance at a block(by block hash or height).
- [chain]/proxy/[delegator]/[delegatee]/[blockHashOrHeight?]: get the proxy info between 2 addresses.
- [chain]/chain/height: get current chain height.
- [chain(statemine|karura|bifrost)]/token/[assetId]/account/[account]/[blockHashOrHeight?]: get the token/asset balance by asset id.
- /evm/chain/[chain]/erc20/contract/[contract]/address/[address]/height/[blockHeight]: get ERC20 token balance from evm chains.
- /evm/chain/[chain]/contract/height/[timestamp?]: get evm chains height by time.
- /issuance/token/[token]/[blockHashOrHeight?]: get predefined token total issuance at specified block height/hash.

## backend

It integrates [koa.js](https://koajs.com/) as the backend server, and you can find the code under `packages/backend` folder.
The server provides apis for spaces, balances and proposals, check them
under `packages/backend/features` folder.

It depends on [MongoDB](https://www.mongodb.com/) and related proposal and votes data are stored.
All votes data are signed with polkadot keys and uploaded to IPFS too. We use [decoo](https://decoo.io/)
as the IPFS service provider, so make sure to register an account and get the corresponding decoo api token and secret key.

This package also depends on the node-api package to fetch on-chain info.
So don't forget to config the required `NODE_API_ENDPOINT` environment variable.

Generally, Its features include:

- Providing restful apis for next page.
- Managing business data with MongoDB.
- Querying chain data from `node-api` package.

## next

Next package depends on [next.js](https://nextjs.org/) and renders the fronted pages.

# How to run it

## Prerequisite

### MongoDB

Make sure mongodb is installed, while corresponding url is required to config in the next package.
Check [here](https://docs.mongodb.com/manual/installation/) to find a way to install it natively, or run it with docker:

```bash
docker run -d --name mongo -p 27017:27017 mongo:4.4.2
```

You may need more configuration for production environment.

### Infura ipfs project api key and secret

Register an [infura](https://infura.io/) account and get the api key and secret.

```dotenv
INFURA_PROJECT_ID=
INFURA_PROJECT_SECRET=
```

## Run

### 1. Run node-api

```bash
cd backend/packages/node-api
yarn
cat .env.example > .env
```

The default environment variables will work, but if you want to change some, just edit the '.env' file.

```dotenv
# You can change the chain endpoints, separated by ';'.
DOT_ENDPOINTS=wss://rpc.polkadot.io;wss://polkadot.api.onfinality.io/public-ws;wss://polkadot-rpc.dwellir.com
KSM_ENDPOINTS=wss://kusama-rpc.polkadot.io;wss://kusama.api.onfinality.io/public-ws;wss://kusama-rpc.dwellir.com
KAR_ENDPOINTS=wss://karura.api.onfinality.io/public-ws;wss://karura-rpc-0.aca-api.network;wss://karura-rpc-1.aca-api.network;wss://karura-rpc-2.aca-api.network/ws;wss://karura-rpc-3.aca-api.network/ws;wss://karura.polkawallet.io
KHA_ENDPOINTS=wss://khala.api.onfinality.io/public-ws
STATEMINE_ENDPOINTS=wss://statemine.api.onfinality.io/public-ws;wss://statemine-rpc.polkadot.io
BNC_ENDPOINTS=wss://bifrost-parachain.api.onfinality.io/public-ws;wss://bifrost-rpc.liebi.com/ws;wss://us.bifrost-rpc.liebi.com/ws;wss://eu.bifrost-rpc.liebi.com/ws
KINT_ENDPOINTS=wss://kintsugi.api.onfinality.io/public-ws;wss://api-kusama.interlay.io/parachain
INTR_ENDPOINTS=wss://interlay.api.onfinality.io/public-ws;wss://api.interlay.io/parachain

# You need a infura key to call the ethereum rpcs
INFURA_KEY=xxx
# Alchemy.com api key. Optional, there will be no alchemy nodes if not set
ALCHEMY_KEY=xxx

SERVER_PORT=3223 # keep it
```

Then run

```bash
node src/newTokenWeightedSpace.js
```

Well, the node-api should be ready.

### 2. Run [backend](./packages/backend) for the restful api server

Come back to the project root dir and run

```bash
cd backend/packages/backend
yarn
cat .env.example > .env
```

Open the '.env' file and do necessary configuration

```dotenv
PORT=8081 # keep it, it will be the resutful api server port

MONGO_URL=mongodb://localhost:27017 # set your mongodb url
MONGO_DB_NAME=voting # keep it or change it to any name you like

INFURA_PROJECT_ID=
INFURA_PROJECT_SECRET=
LOCAL_IPFS_NODE_URL=http://localhost:5001
USE_LOCAL_IPFS_NODE=false
IPFS_ENDPOINT=https://opensquare.infura-ipfs.io/ipfs/

TEST_ACCOUNTS=xxx|yyy # ignore it, for test
TEST_ACCOUNT_BALANCE=100000000000 # ignore it, for test

# The node api server url. Do not append '/' to the end.
NODE_API_ENDPOINT=http://localhost:3223
```

Run following scripts to initialize the spaces in database

```bash
cd backend/packages/backend && node src/scripts/init-spaces.js
```

Then run

```bash
yarn run dev
```

or

```bash
node server.js
```

The restful api server will be ready.

### 3. Run next package for the fronted

Come back to the project root dir and run

```bash
cd next
cat .env.example > .env
```

Open the '.env' file and do necessary configuration

```dotenv
PORT=8001

NEXT_PUBLIC_API_END_POINT=http://127.0.0.1:8001/
NEXT_PUBLIC_BACKEND_API_END_POINT=http://127.0.0.1:8081/

NEXT_PUBLIC_IDENTITY_SERVER_HOST=https://id.statescan.io
```

Then run

```bash
yarn run dev
```

or

```bash
node server.js
```

Do everything work well? Join [OpenSquare matrix room](https://matrix.to/#/#opensquare:matrix.org) if any problems.

## Links

**[Documentation](https://docs.opensquare.io/)**
