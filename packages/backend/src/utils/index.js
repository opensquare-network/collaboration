const crypto = require("crypto");
const BigNumber = require("bignumber.js");
const { ethers } = require("ethers");
const { Decimal128 } = require("mongodb");
const { encodeAddress, signatureVerify } = require("@polkadot/util-crypto");

function extractPage(ctx) {
  const { page_size: queryPageSize, page: queryPage } = ctx.query;

  let pageSize;
  try {
    pageSize = parseInt(queryPageSize || "");
    pageSize = isNaN(pageSize) ? 10 : Math.max(1, pageSize);
  } catch (e) {
    pageSize = 10;
  }

  let page;
  if (queryPage === "last") {
    page = queryPage;
  } else {
    try {
      page = parseInt(queryPage || "");
      page = isNaN(page) ? 1 : Math.max(1, page);
    } catch (e) {
      page = 1;
    }
  }

  return {
    page,
    pageSize,
  };
}

function handler(obj, method) {
  return obj[method].bind(obj);
}

function md5(str) {
  const md5 = crypto.createHash("md5");
  return md5.update(str).digest("hex");
}

function isValidSignature(signedMessage, signature, address) {
  const result = signatureVerify(signedMessage, signature, address);
  try {
    return encodeAddress(result.publicKey, 42) === encodeAddress(address, 42);
  } catch (e) {
    return false;
  }
}

function toDecimal128(num) {
  return Decimal128.fromString(new BigNumber(num).toString());
}

const testAccounts = (process.env.TEST_ACCOUNTS || "")
  .split("|")
  .filter((acc) => acc)
  .map((addr) => {
    if (ethers.utils.isAddress(addr)) {
      return addr.toLowerCase();
    }
    return encodeAddress(addr, 42).toLowerCase();
  });

function isTestAccount(address) {
  let target = address;
  if (!ethers.utils.isAddress(address)) {
    target = encodeAddress(address, 42);
  }

  return testAccounts.includes((target || "").toLowerCase());
}

function fromSymbolUnit(value, decimals) {
  return new BigNumber(value).div(Math.pow(10, decimals)).toString();
}

function toSymbolUnit(value, decimals) {
  return new BigNumber(value).times(Math.pow(10, decimals)).toString();
}

function enhancedSqrtOfBalance(balance, decimals, voteThreshold) {
  const val = new BigNumber(balance);
  let num = val.div(Math.pow(10, decimals));
  if (num.gte(1)) {
    num = num.sqrt();
  } else {
    const symbolVoteThreshold = new BigNumber(voteThreshold)
      .div(Math.pow(10, decimals))
      .toString();
    num = num.div(symbolVoteThreshold).sqrt().times(symbolVoteThreshold);
  }
  return num.times(Math.pow(10, decimals)).integerValue().toString();
}

function isSamePublicKey(address1, address2) {
  return encodeAddress(address1, 42) === encodeAddress(address2, 42);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timeout(ms) {
  await sleep(ms);
  throw new Error("timeout");
}

module.exports = {
  extractPage,
  handler,
  md5,
  isValidSignature,
  toDecimal128,
  isTestAccount,
  toSymbolUnit,
  fromSymbolUnit,
  enhancedSqrtOfBalance,
  isSamePublicKey,
  sleep,
  timeout,
};
