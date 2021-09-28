const SPACES = [
  "kusama",
  "polkadot",
  "karura",
  "khala",
];

const SS58Format = Object.freeze({
  Polkadot: 0,
  Kusama: 2,
  Karura: 8,
  Khala: 30,
  Substrate: 42,
});

const ContentType = Object.freeze({
  Markdown: "markdown",
  Html: "html",
});

const PostTitleLengthLimitation = 160;

module.exports = {
  SPACES,
  SS58Format,
  ContentType,
  PostTitleLengthLimitation,
};
