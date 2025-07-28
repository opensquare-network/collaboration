import { addressEllipsis } from "frontedUtils";
import { uniqWith, isNil } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { fetchIdentity } from "services/identity";
import Author from "../author";
import { chainConfigsMap } from "../../frontedUtils/consts/chains";
import { isSameAddress } from "frontedUtils/address";

export function useSuggestions(comments = [], votes = null) {
  const [suggestions, setSuggestions] = useState();

  const resolveMentionFormat = (identity, user) =>
    `[@${identity?.info?.display || addressEllipsis(user.address)}](${
      user.address
    }-${user.network}) `;

  const fetchIdentitySuggestions = useCallback(async () => {
    const commentUsers = (comments?.items || []).map((comment) => ({
      address: comment.address,
      network: comment.commenterNetwork,
      source: "comment",
    }));

    const voterUsers = votes?.items
      ? votes.items.map((vote) => ({
          address: vote.voter ?? vote.address,
          network: vote.voterNetwork,
          source: "voter",
        }))
      : [];

    const allUsers = uniqWith(
      [...commentUsers, ...voterUsers],
      (a, b) => isSameAddress(a.address, b.address) && a.network === b.network,
    );

    const userIdentities = await Promise.all(
      allUsers.map(async (item) => {
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
        source: user.source,
        displayName: user.identity?.info?.display ?? null,
      };
    });
  }, [comments, votes]);

  const loadSuggestions = (text) => {
    if (!suggestions) {
      return [];
    }

    const lowerText = text.toLowerCase();

    return suggestions?.filter((item) => {
      const { displayName, address } = item;
      if (
        !isNil(displayName) &&
        displayName.toLowerCase().includes(lowerText)
      ) {
        return true;
      }

      if (address.toLowerCase().includes(lowerText)) {
        return true;
      }

      return false;
    });
  };

  useEffect(() => {
    fetchIdentitySuggestions().then((v) => {
      setSuggestions(v);
    });
  }, [comments, votes, fetchIdentitySuggestions]);

  return {
    suggestions,
    loadSuggestions,
  };
}
