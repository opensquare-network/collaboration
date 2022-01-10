# OpenSquare Collaboration

OpenSquare Collaboration is an off-chain gas free collaboration platform.
Currently, off chain voting has been implemented while bounties and paid questions are in the plan.

Off chain voting now support [substrate](https://github.com/paritytech/substrate) based chains.
Assets on Statemine/Statemint will be supported soon.
# Code structure
The code is organized with [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and make
sure yarn is installed before running it. There are 2 packages `node-api` and `next` under the `packages` folder.

## node-api
This package initializes multiple [@polkadot/api](https://github.com/polkadot-js/api) instances
for each chain in case of a single endpoint failure. It is in charge of interaction with chain nodes 
and provides restful apis for caller to fetch on-chain data. The apis include:

- [chain]/balance/[address]/[blockHashOrHeight?]: get the address balance at a block(by block hash or height).
- [chain]/proxy/[delegator]/[delegatee]/[blockHashOrHeight?]: get the proxy info between 2 addresses.
- [chain]/chain/height: get current chain height.

## next

Next package depends on [next.js](https://nextjs.org/), renders the fronted pages and provides apis.
It integrates [koa.js](https://koajs.com/) as the backend server, and you can find the code under
`packages/next/backend` folder. The server provides apis for spaces, balances and proposals, check them
under `packages/next/backend/features` folder.

It depends on [MongoDB](https://www.mongodb.com/) and related proposal and votes data are stored.
All votes data are signed with polkadot keys and uploaded to IPFS too. We use [decoo](https://decoo.io/) 
as the IPFS service provider, so make sure to register an account and get the corresponding decoo api token and secret key. 

This package also depends on the node-api package to fetch on-chain info. 
So don't forget to config the required `NODE_API_ENDPOINT` environment variable.

# How to run it

## Prerequisite

### MongoDB
Make sure mongodb is installed, while corresponding url is required to config in the next package. 
Check [here](https://docs.mongodb.com/manual/installation/) to find a way to install it natively, or run it with docker:
```bash
docker run -d --name mongo -p 27017:27017 mongo:4.4.2
```
You may need more configuration for production environment.

### Decoo api key and secret
Register an [decoo](https://decoo.io/) account and get the api key and secret. Or for your convenience, just use following test key.
```dotenv
DECOO_API_SECRET_KEY=MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAJxxBVD13g3ah0E5OYS13yJ5UbON9cn9Q5dnCEM/T7opfClOGYeG/dH+8uoNEweCcTBkueU+sLtFAYRMThihmT8VolFvbEtI0rrdXClAqzjxoQwN5DPOyGKs2ngDjG6I8Ar5y0BIYdoHNvoU0k0PzefGT51LwnNZoVDMODpkKdjnAgMBAAECgYBCbge44j6hmVr3yknvXZ9brzKPUUe+tundv6WVkKvVPEp5660RjLP5WQ5jbpvXA3/28b6yZtV7IAlN2W0MLoq4wS/0Il0h1Kha5G6T6WI/SgD2bfC0AsuCBU5lA9iMCgoidfBE+6BjlJDH7QSsNI3LQWwxUQ7osN58p1k9i4egmQJBAN1Q0sBx2SgZjifwlSVA13iESrs0xe/Pagf5S9cuRUnHZs+9v7ZJXuOmJ7Ple7vstuMTMWqWtUWV3st1psdMbbMCQQC09XJDCyZD6soIVgWkV30rSUGRUf65QHC2K4HLtVdpSes1L6GiCxgxyxV/I24o8p/5JN11MMR5QpRc5go1d1X9AkEAxMZ9/Dm9mNfP+1b/ZRYX/sGxKG4tp6FFZz2S3wn29ThkA0V01YC667HqDxt1PoujuJZyE5FYLzyn0UMUPJOJ3QJBAJC83UaYrWOXcT8Xpu2a+MfdkS8t2ULNMxnSVL/d7OuPLy1cSrj0jMaO/EOz0BG6do/tl6B7gDrJMSfY64N2TvUCQQCzJDnyA38Fz9fo2htWp6cKzA4pNrHBpRtYVaLXp4Sc56JcN3SMS6f3E4n7rFLIZmvjW1MryiGN8fVzTgqQAmN4
DECOO_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOnsiYXBpX2tleSI6IjExNThLQmZ3N1pmQ3pGdFd1NEFNaXRHRU9YYUxNMlZpN2Q1TzE2MzcxMzU2ODgyMDkiLCJ1c2VyX2lkIjoxMTU4fX0.tKeVjP4CxyVeZn8Y1OPzR177noAWzqgoWBXLnup1Y7Y
```

## Run

### 1. Dependency installation

```bash
yarn
```

### 2. Run node-api

```bash
cd packages/node-api
cat .env.example > .env
```
The default environment variables will work, but if you want to change some, just edit the '.env' file.

```dotenv
# You can change the chain endpoints, separated by ';'.
DOT_ENDPOINTS=wss://pub.elara.patract.io/polkadot;wss://rpc.polkadot.io;wss://polkadot.api.onfinality.io/public-ws;wss://polkadot.geometry.io/websockets
KSM_ENDPOINTS=wss://kusama-rpc.polkadot.io;wss://pub.elara.patract.io/kusama;wss://kusama.api.onfinality.io/public-ws;wss://kusama.geometry.io/websockets
KAR_ENDPOINTS=wss://karura.api.onfinality.io/public-ws;wss://karura-rpc-0.aca-api.network;wss://karura-rpc-1.aca-api.network;wss://karura-rpc-2.aca-api.network/ws;wss://karura-rpc-3.aca-api.network/ws;wss://karura.polkawallet.io;wss://pub.elara.patract.io/karura
KHA_ENDPOINTS=wss://khala.api.onfinality.io/public-ws

PORT=3223 # keep it
```

Then run 

```bash
node src/index.js
```

Well, the node-api should be ready.

### 3. Run next package for the server and fronted

Come back to the project root dir and run
```bash
cd packages/node-api
cat .env.example > .env
```

Open the '.env' file and do necessary configuration
```dotenv
PORT=8001 # keep it

NEXT_PUBLIC_API_END_POINT=http://127.0.0.1:8001/ # keep it
NEXT_PUBLIC_SSR_API_END_POINT=http://127.0.0.1:8001/ # keep it

MONGO_URL=mongodb://localhost:27017 # set your mongodb url
MONGO_DB_NAME=voting # keep it or change it to any name you like

NEXT_PUBLIC_IDENTITY_SERVER_HOST=https://id.statescan.io # keep it

DECOO_API_OAUTH_ENDPOINT=https://api.decoo.io
DECOO_API_UPLOAD_ENDPOINT=https://api-hk.decoo.io
DECOO_IPFS_ENDPOINT=https://ipfs-hk.decoo.io/ipfs/
DECOO_API_TOKEN=xxx # fill the decoo jwt token
DECOO_API_SECRET_KEY=xxx # fill the decoo verification key

TEST_ACCOUNTS=xxx|yyy # ignore it, for test
TEST_ACCOUNT_BALANCE=100000000000 # ignore it, for test

# The node api server url. Do not append '/' to the end.
NODE_API_ENDPOINT=http://localhost:3223
```

Run following scripts to initialize the spaces in database
```bash
cd packages/next && node backend/scripts/init-spaces.js
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
