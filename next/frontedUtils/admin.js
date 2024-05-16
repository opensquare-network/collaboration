import { isSameAddress } from "./address";

export function isAdmin(space, address) {
  return (
    (space.admins || []).findIndex((item) => isSameAddress(item, address)) !==
    -1
  );
}
