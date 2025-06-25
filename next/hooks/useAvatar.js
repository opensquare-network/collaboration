import { useEffect, useState } from "react";
import { isNil } from "lodash-es";
import {
  fetchAvatar,
  getCachedAvatar,
  removeCachedAvatar,
} from "services/avatar";
import { encodeNetworkAddress } from "@osn/common";

// only support polkadot now
const AVATAR_NETWORK = "polkadot";

export async function refreshAvatar(address) {
  const encodedAddress = encodeNetworkAddress(address, AVATAR_NETWORK);
  removeCachedAvatar(encodedAddress);
  await fetchAvatar(encodedAddress);
}

export default function useAvatarInfo(address) {
  const encodedAddress = encodeNetworkAddress(address, AVATAR_NETWORK);
  const cachedAvatar = getCachedAvatar(encodedAddress);
  const [avatar, setAvatar] = useState(cachedAvatar);

  useEffect(() => {
    setAvatar(cachedAvatar);
  }, [cachedAvatar]);

  useEffect(() => {
    if (encodedAddress) {
      fetchAvatar(encodedAddress)
        .then((result) => {
          if (result === avatar) {
            return;
          }

          setAvatar(result);
        })
        .catch(() => {
          setAvatar(null);
        });
    }
  }, [encodedAddress, avatar]);

  return [avatar, !isNil(avatar)];
}
