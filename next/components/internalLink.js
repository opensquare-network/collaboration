import Link from "next/link";

export default function InternalLink({ href, children }) {
  return href ? <Link href={href}>{children}</Link> : <>{children}</>;
}
