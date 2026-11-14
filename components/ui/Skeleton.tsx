/** Loading placeholder. Give it the same size as the content it stands in for. */
export function Skeleton({ width = "100%", height = 16, dark = false }: { width?: number | string; height?: number | string; dark?: boolean }) {
  return <span className={`sk ${dark ? "d" : ""}`} style={{ width, height }} aria-hidden="true" />;
}
