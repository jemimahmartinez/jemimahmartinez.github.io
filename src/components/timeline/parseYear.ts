const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

export function isPresent(s?: string | null): boolean {
  return !!s && s.trim().toLowerCase() === "present";
}

export function parseYear(s: string): number {
  if (isPresent(s)) {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  }
  const parts = s.trim().toLowerCase().split(/\s+/);
  if (parts.length === 1) return parseInt(parts[0], 10);
  const monthKey = parts[0].substring(0, 3);
  const month = MONTHS[monthKey] ?? 0;
  const year = parseInt(parts[parts.length - 1], 10);
  return year + month / 12;
}
