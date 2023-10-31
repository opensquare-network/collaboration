import React from "react";
import LKSM from "../public/imgs/icons/symbol/lksm.svg";
import taiKSM from "../public/imgs/icons/symbol/taiKSM.svg";
import KSM from "../public/imgs/icons/chain/kusama.svg";
import DOT from "../public/imgs/icons/chain/polkadot.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const svgs = {
  LKSM,
  taiKSM,
  DOT,
  KSM,
};

function ResolveChainIcon(symbolName = "", size = 24) {
  if (svgs[symbolName]) {
    const SvgIcon = svgs[symbolName];
    const Icon = <SvgIcon viewBox="0 0 24 24" width={size} height={size} />;
    return Icon;
  }

  return null;
}

function SymbolIcon({ symbolName, size = 24 }) {
  return <Wrapper>{ResolveChainIcon(symbolName, size)}</Wrapper>;
}

export default SymbolIcon;
