const { isAddress, isEthereumAddress } = require("@polkadot/util-crypto");
const { ContentType } = require("../constants");
const cheerio = require("cheerio");
const { toPublicKey } = require(".");

function findDIDMentionsFromMarkdown(content) {
  const mentions = [];
  const reMention = /\[@[^\]]+\]\((\w+)-(\w+)\)/g;
  let match;
  while ((match = reMention.exec(content)) !== null) {
    const [, address] = match;
    if (!isAddress(address) && !isEthereumAddress(address)) {
      continue;
    }
    mentions.push(address);
  }

  return mentions;
}

function findNonDIDMentionsFromMarkdown(content) {
  const mentions = [];

  const reMention = /\[@[^\]]+\]\(\/(member|user)\/([-\w]+)\)/g;
  let match;
  while ((match = reMention.exec(content)) !== null) {
    const [, , usernameOrAddr] = match;
    mentions.push(usernameOrAddr);
  }

  return mentions;
}

function extractMentions(content, contentType) {
  const mentions = new Set();
  if (contentType === ContentType.Markdown) {
    const foundMentions = [
      ...findDIDMentionsFromMarkdown(content),
      ...findNonDIDMentionsFromMarkdown(content),
    ];
    for (const item of foundMentions) {
      mentions.add(item);
    }
  }

  if (contentType === ContentType.Html) {
    const $ = cheerio.load(content);
    $(".mention").each((i, el) => {
      const at = $(el).attr("data-id");
      if (at) {
        mentions.add(at);
      }
    });
  }

  return mentions;
}

async function extractMentionUsers(content, contentType) {
  const mentions = extractMentions(content, contentType);

  const polkadotAddresses = [];
  const ethereumAddresses = [];
  const usernames = [];
  for (const item of mentions) {
    if (isEthereumAddress(item)) {
      ethereumAddresses.push(item);
      continue;
    }
    if (isAddress(item)) {
      polkadotAddresses.push(item);
      continue;
    }
    usernames.push(item);
  }
  const polkadotPublicKeys = polkadotAddresses.map((item) => toPublicKey(item));

  return polkadotPublicKeys;
}

module.exports = {
  extractMentionUsers,
};
