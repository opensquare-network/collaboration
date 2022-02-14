const crypto = require("crypto");
const BigNumber = require("bignumber.js");
const { Decimal128 } = require("mongodb");
const {
  decodeAddress,
  encodeAddress,
  signatureVerify,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

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
  const result = signatureVerify(
    `<Bytes>${signedMessage}</Bytes>`,
    signature,
    hexPublicKey
  );
  return result.isValid;
}

function toDecimal128(num) {
  return Decimal128.fromString(new BigNumber(num).toString());
}

const testAccounts = (process.env.TEST_ACCOUNTS || "")
  .split("|")
  .filter((acc) => acc);
function isTestAccount(address) {
  return testAccounts.includes(encodeAddress(address, 42));
}

function fromSymbolUnit(value, decimals) {
  return new BigNumber(value).div(Math.pow(10, decimals)).toString();
}

function toSymbolUnit(value, decimals) {
  return new BigNumber(value).times(Math.pow(10, decimals)).toString();
}

function sqrtOfBalance(balance) {
  const sqrt = new BigNumber(balance).sqrt().integerValue().toString();
  return sqrt;
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

module.exports = {
  extractPage,
  handler,
  md5,
  isValidSignature,
  toDecimal128,
  isTestAccount,
  toSymbolUnit,
  fromSymbolUnit,
  sqrtOfBalance,
  enhancedSqrtOfBalance,
};
