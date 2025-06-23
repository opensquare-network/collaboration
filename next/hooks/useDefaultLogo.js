import { useMemo } from "react";
import { identicon } from "minidenticons";

export const getDefaultLogoUri = (name, saturation, lightness) => {
  const svgText = identicon(name, saturation, lightness);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
};

export const useDefaultLogo = ({ username, saturation, lightness }) => {
  return useMemo(() => {
    if (!username) {
      return null;
    }
    return getDefaultLogoUri(username, saturation, lightness);
  }, [username, saturation, lightness]);
};
