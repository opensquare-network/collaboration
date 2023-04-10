/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
const BigNumber = require("bignumber.js");

function compareRationals(n1, d1, n2, d2) {
  while (true) {
    const q1 = n1.idiv(d1);
    const q2 = n2.idiv(d2);

    if (q1.lt(q2)) {
      return true;
    } else if (q2.lt(q1)) {
      return false;
    }

    const r1 = n1.mod(d1);
    const r2 = n2.mod(d2);

    if (r2.isZero()) {
      return false;
    } else if (r1.isZero()) {
      return true;
    }

    n1 = d2;
    n2 = d1;
    d1 = r2;
    d2 = r1;
  }
}

function calcPassing(ayeBalance, nayBalance, threshold, totalIssuance) {
  const ayes = new BigNumber(ayeBalance);
  const nays = new BigNumber(nayBalance);
  const turnout = ayes.plus(nays);
  const sqrtTurnout = turnout.sqrt().integerValue(BigNumber.ROUND_DOWN);
  const electorate = new BigNumber(totalIssuance);
  const sqrtElectorate = electorate.sqrt().integerValue(BigNumber.ROUND_DOWN);

  if (sqrtTurnout.isZero()) {
    return false;
  }

  if (threshold.toLowerCase() === "supermajorityapprove") {
    return compareRationals(nays, sqrtTurnout, ayes, sqrtElectorate);
  } else if (threshold.toLowerCase() === "supermajorityagainst") {
    return compareRationals(nays, sqrtElectorate, ayes, sqrtTurnout);
  }

  return false;
}

module.exports = {
  calcPassing,
};
