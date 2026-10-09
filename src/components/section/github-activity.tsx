import { Prompt, TerminalWindow } from "../ui/terminal";

const USER = "ItsMeD4N";
// level 0-4 -> white at increasing opacity
const SHADES = ["bg-white/[0.07]", "bg-white/25", "bg-white/50", "bg-white/75", "bg-white"];

// Reads GitHub's public contribution calendar (no token needed), refreshed daily.
// ponytail: scrapes GitHub's HTML; if the markup changes the section just hides itself.
async function getActivity() {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const grid: number[][] = Array.from({ length: 7 }, () => []);
    for (const [, row, col, level] of html.matchAll(
      /id="contribution-day-component-(\d)-(\d+)" data-level="(\d)"/g
    )) {
      grid[+row][+col] = +level;
    }
    const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1];
    return grid[0].length ? { grid, total } : null;
  } catch {
    return null;
  }
}

export default async function GithubActivity() {
  const data = await getActivity();
  if (!data) return null;
  const weeks = Math.max(...data.grid.map((r) => r.length));

  return (
    <div className="space-y-5 pb-10">
      <Prompt path="~/github" cmd={`gh activity --user ${USER}`} className="text-lg md:text-xl" />
      <TerminalWindow title={`github.com/${USER} — last 12 months`}>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-4 p-5 md:p-7"
        >
          {/* justify-end + overflow-hidden: narrow screens drop the oldest weeks instead of scrolling */}
          <div className="flex justify-end overflow-hidden" aria-hidden>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {Array.from({ length: weeks }, (_, c) =>
                data.grid.map((row, r) => (
                  <span key={`${c}-${r}`} className={`size-[11px] ${row[c] === undefined ? "" : SHADES[row[c]]}`} />
                ))
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              <span className="text-primary">{data.total ?? "?"}</span> contributions in the last year
            </span>
            <span className="flex items-center gap-[3px]">
              less
              {SHADES.map((c) => (
                <span key={c} className={`size-[11px] ${c}`} />
              ))}
              more
            </span>
          </div>
        </a>
      </TerminalWindow>
    </div>
  );
}
