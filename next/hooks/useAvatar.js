import { useEffect, useState } from "react";
import { isNil } from "lodash-es";
import {
  fetchAvatar,
  getCachedAvatar,
  removeCachedAvatar,
} from "services/avatar";

export async function refreshAvatar(address) {
  removeCachedAvatar(address);
  await fetchAvatar(address);
}

export default function useAvatarInfo(address) {
  const cachedAvatar = getCachedAvatar(address);
  const [avatar, setAvatar] = useState(cachedAvatar);

  useEffect(() => {
    setAvatar(cachedAvatar);
  }, [cachedAvatar]);

  useEffect(() => {
    const avatarServerHost = process.env.NEXT_PUBLIC_AVATAR_SERVER_HOST;
    if (address && avatarServerHost) {
      fetchAvatar(address, avatarServerHost)
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
  }, [address, avatar]);

  return [avatar, !isNil(avatar)];
}
