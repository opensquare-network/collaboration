import { addressEllipsis } from "frontedUtils";
import { uniqWith } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { fetchIdentity } from "services/identity";
import Author from "../author";
import { chainConfigsMap } from "../../frontedUtils/consts/chains";

export function useSuggestions(comments = []) {
  const [suggestions, setSuggestions] = useState();

  const resolveMentionFormat = (identity, user) =>
    `[@${identity?.info?.display || addressEllipsis(user.address)}](${
      user.address
    }-${user.network}) `;

  const fetchIdentitySuggestions = useCallback(async () => {
    const userIdentities = await Promise.all(
      uniqWith(
        (comments?.items || []).map((comment) => {
          return {
            address: comment.address,
            network: comment.commenterNetwork,
          };
        }),
        (a, b) => a.address === b.address && a.network === b.network,
      ).map(async (item) => {
        const configs = chainConfigsMap[item.network];
        const identityChain = (configs && configs.identity) || item.network;
        const identity = await fetchIdentity(identityChain, item.address);
        return {
          ...item,
          identity,
        };
      }),
    );

    return userIdentities.map((user) => {
      return {
        address: user.address,
        value: resolveMentionFormat(user.identity, user),
        preview: (
          <Author
            showNetwork
            address={user.address}
            space={{ network: user.network }}
            noLink
          />
        ),
      };
    });
  }, [comments]);

  const loadSuggestions = (text) => {
    return suggestions.filter((i) =>
      i.address.toLowerCase().includes(text.toLowerCase()),
    );
  };

  useEffect(() => {
    fetchIdentitySuggestions().then((v) => {
      setSuggestions(v);
    });
  }, [comments, fetchIdentitySuggestions]);

  return {
    suggestions,
    loadSuggestions,
  };
}
