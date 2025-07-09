const crypto = require("crypto");
const BigNumber = require("bignumber.js");
const { ethers } = require("ethers");
const { Decimal128 } = require("mongodb");
const {
  encodeAddress,
  signatureVerify,
  cryptoWaitReady,
  decodeAddress,
} = require("@polkadot/util-crypto");

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

async function isValidSignature(signedMessage, signature, address) {
  await cryptoWaitReady();
  try {
    const result = signatureVerify(signedMessage, signature, address);
    return result.isValid;
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

function enhancedSqrtOfBalance(balance, decimals) {
  if (!balance) {
    return balance;
  }
  return new BigNumber(balance)
    .div(Math.pow(10, decimals))
    .sqrt()
    .times(Math.pow(10, decimals))
    .integerValue()
    .toString();
}

function toPublicKey(address) {
  const publicKey = decodeAddress(address);
  return Buffer.from(publicKey).toString("hex");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function timeout(ms) {
  await sleep(ms);
  throw new Error("timeout");
}

function isUseReCaptcha() {
  return !!process.env.RECAPTCHA_SECRET;
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
  toPublicKey,
  sleep,
  timeout,
  isUseReCaptcha,
};
