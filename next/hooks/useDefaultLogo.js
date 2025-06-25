import { useMemo } from "react";
import { identicon } from "minidenticons";
import unescape from "lodash/unescape";

export const getDefaultLogoUri = (name, saturation, lightness) => {
  const svgText = identicon(name, saturation, lightness);
  return `data:image/svg+xml;base64,${btoa(unescape(svgText))}`;
};

export const useDefaultLogo = ({ username, saturation, lightness }) => {
  return useMemo(() => {
    if (!username) {
      return null;
    }
    return getDefaultLogoUri(username, saturation, lightness);
  }, [username, saturation, lightness]);
};
