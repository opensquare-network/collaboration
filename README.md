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

## Links

**[Documentation](https://docs.opensquare.io/)**
