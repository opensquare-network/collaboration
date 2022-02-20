const { chains, symbols, } = require("../../constants");

const supportedChainSymbols = {
  [chains.karura]: [
    symbols.RMRK,
  ],
  [chains.bifrost]: [
    symbols.RMRK,
  ],
}

const emptyBalance = {
  free: 0,
  reserved: 0,
}

module.exports = {
  supportedChainSymbols,
}
