// Parses the study's scripture references and reads bundled KJV text (no network).

import { kjvPassages } from "@/lib/kjv-passages";

const abbreviations: Record<string, string> = {
  gen: "Genesis",
  rom: "Romans",
  cor: "Corinthians",
  col: "Colossians",
  eph: "Ephesians",
  thess: "Thessalonians",
  tim: "Timothy",
  pet: "Peter",
  heb: "Hebrews",
  rev: "Revelation",
  psalm: "Psalms",
};

export type Passage = { book: string; passage: string; query: string };

function expandBook(raw: string) {
  const m = raw.trim().match(/^([1-3]\s+)?([A-Za-z]+)\.?$/);
  if (!m) return raw.trim();
  const name = abbreviations[m[2].toLowerCase()] ?? m[2];
  return `${m[1] ?? ""}${name}`.replace(/\s+/g, " ");
}

/** "Acts 2:37–41; 8:35–39" → [{Acts 2:37-41}, {Acts 8:35-39}] */
export function parseReference(ref: string): Passage[] {
  const out: Passage[] = [];
  let book = "";
  for (const seg of ref.split(/[;·]/)) {
    const m = seg.trim().match(/^(.*?)\s*(\d+(?::\d+)?(?:\s*[–-]\s*\d+)?)$/);
    if (!m) continue;
    if (m[1]) book = expandBook(m[1]);
    if (!book) continue;
    const passage = m[2].replace(/\s*[–-]\s*/, "-");
    out.push({ book, passage, query: `${book} ${passage}` });
  }
  return out;
}

export function bibleGatewayUrl(ref: string) {
  const q = parseReference(ref)
    .map((p) => p.query)
    .join("; ");
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(q || ref)}&version=KJV`;
}

export type VerseText = { reference: string; verses: { verse: number; text: string }[] };

/** Looks up bundled KJV text for a passage; returns undefined if it was not bundled. */
export function getPassage(p: Passage): VerseText | undefined {
  return kjvPassages[p.query];
}
