function resolveCoversRepoFilepathUrl(filename) {
  return `https://cdn.jsdelivr.net/gh/opensquare-network/collaboration-static/covers/${filename}`;
}

export function getOpenGraphImages(coverFilename = "off-chain_voting.jpg") {
  return {
    large: resolveCoversRepoFilepathUrl(coverFilename),
  };
}
