export default function getStorageLink(cid) {
  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT;

  return `${endpoint}/${cid}`;
}
