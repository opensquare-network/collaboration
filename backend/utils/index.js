const crypto = require("crypto");
const BigNumber = require("bignumber.js");
const { Decimal128 } = require("mongodb");
const {
  decodeAddress,
  encodeAddress,
  signatureVerify,
} = require("@polkadot/util-crypto");
const { u8aToHex, stringUpperFirst } = require("@polkadot/util");
const { SS58Format } = require("../constants");
const { HttpError } = require("../exc");

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
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);
  const result = signatureVerify(`<Bytes>${signedMessage}</Bytes>`, signature, hexPublicKey);
  return result.isValid;
}

function validateAddress(address, chain) {
  const ss58Format = SS58Format[stringUpperFirst(chain)];
  if (ss58Format === undefined) {
    throw new HttpError(400, { chain: ["Unsupported relay chain."] });
  }

  const validAddress = encodeAddress(address, ss58Format);
  if (validAddress !== address) {
    throw new HttpError(400, {
      address: [`Not a valid ${chain} ss58format address.`],
    });
  }
}

function toDecimal128(num) {
  return Decimal128.fromString(new BigNumber(num).toString());
}

const testAccounts = (process.env.TEST_ACCOUNTS || "").split("|").filter(acc => acc);
function isTestAccount(address) {
  return testAccounts.includes(address);
}

function fromSymbolUnit(value, decimals) {
  return new BigNumber(value).div(Math.pow(10, decimals)).toString();
}

function toSymbolUnit(value, decimals) {
  return new BigNumber(value).times(Math.pow(10, decimals)).toString();
}

function sqrtOfBalance(balance, decimals) {
  const value = fromSymbolUnit(balance, decimals);
  const sqrt = new BigNumber(value).sqrt().toString();
  const result = toSymbolUnit(sqrt, decimals);
  return result;
}

module.exports = {
  extractPage,
  handler,
  md5,
  isValidSignature,
  validateAddress,
  toDecimal128,
  isTestAccount,
  toSymbolUnit,
  fromSymbolUnit,
  sqrtOfBalance,
};
