export function extractMenuItems(text: string): string[] {
  const regex = /^\s*\d+\.\s+(.+)/gm; // match "<number>. <Menu Text>"
  const matches = text.match(regex);
  return matches
    ? matches.map((match) => match.replace(/^\s*\d+\.\s+/, ""))
    : [];
}
