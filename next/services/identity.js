import { createFetchIdentity } from "@osn/common";

export const fetchIdentity = createFetchIdentity(
  process.env.NEXT_PUBLIC_IDENTITY_SERVER_HOST,
);
