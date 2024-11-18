export default function HardLink({ href, children }) {
  return href ? <a href={href}>{children}</a> : <>{children}</>;
}
