const SupportChians = ["kusama", "karura"];

const SS58Format = Object.freeze({
  Polkadot: 0,
  Kusama: 2,
  Karura: 8,
  Substrate: 42,
});

const ContentType = Object.freeze({
  Markdown: "markdown",
  Html: "html",
});

const PostTitleLengthLimitation = 160;

module.exports = {
  SupportChians,
  SS58Format,
  ContentType,
  PostTitleLengthLimitation,
};
