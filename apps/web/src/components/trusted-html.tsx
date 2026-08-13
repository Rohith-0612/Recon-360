// Renders inline <b> emphasis from our own mock dataset (clients.data.ts) — never user-supplied input.
export function TrustedHtml({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
