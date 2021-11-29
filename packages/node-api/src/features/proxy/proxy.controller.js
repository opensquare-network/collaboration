const { getBlockApi } = require("../utils");
const { getApis } = require("../../apis");
const { u8aToHex } = require("@polkadot/util")
const { decodeAddress } = require("@polkadot/util-crypto");

function addrToPubkey(address) {
  return u8aToHex(decodeAddress(address))
}

async function getProxyFromOneApi(api, delegator, toCheckDelegate, blockHashOrHeight) {
  let blockApi = await getBlockApi(api, blockHashOrHeight);
  const data = await blockApi.query.proxy.proxies(delegator);
  const [proxies] = data.toJSON() || [];

  return (proxies || []).some(({ delegate: itemDelegate, proxyType }) => {
      const delegateKey = addrToPubkey(itemDelegate);
      const toCheckKey = addrToPubkey(toCheckDelegate);

      if (delegateKey !== toCheckKey) {
        return false
      }

      return [
        "Any",
        "NonTransfer",
        "Governance",
        "Assets",
      ].includes(proxyType)
    }
  )
}

async function getProxyFromApis(apis, delegator, delegatee, blockHashOrHeight) {
  const promises = [];
  for (const api of apis) {
    promises.push(getProxyFromOneApi(api, delegator, delegatee, blockHashOrHeight));
  }

  return Promise.any(promises);
}

class ProxyController {
  async getProxyRelationship(ctx) {
    const { chain, delegator, delegatee, blockHashOrHeight } = ctx.params;
    if (!delegator) {
      ctx.throw(400, "No delegator given")
      return
    }

    if (!delegatee) {
      ctx.throw(400, "No delegatee given")
    }

    const apis = getApis(chain);
    if (apis.every(api => !api.isConnected)) {
      ctx.throw(500, "No apis connected")
      return
    }

    try {
      const isProxy = await getProxyFromApis(apis, delegator, delegatee, blockHashOrHeight);
      ctx.body = { isProxy }
    } catch (e) {
      console.error('Get proxy from node fail', e)
      ctx.throw(500, "Failed to query proxy from node")
    }
  }
}

module.exports = new ProxyController();
