import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
import { bibleGatewayUrl, getPassage, parseReference, type VerseText } from "@/lib/scripture";

function VerseBody({ refText }: { refText: string }) {
  const passages = parseReference(refText);
  const found = passages.map(getPassage);
  const data = found.filter((p): p is VerseText => Boolean(p));
  if (data.length === 0 || data.length < passages.length) {
    return (
      <p className="text-sm text-muted">
        This passage isn’t stored in the app. Open it on BibleGateway below.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      {data.map((p) => (
        <div key={p.reference}>
          <p className="text-sm font-medium text-brass">{p.reference}</p>
          <p className="mt-1 text-base text-ink">
            {p.verses.map((v) => (
              <span key={v.verse}>
                <sup className="mr-0.5 text-xs text-muted">{v.verse}</sup>
                {v.text}{" "}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

/** A scripture reference that opens its KJV text in a sheet. Displayed wording is unchanged. */
export function Verse({ refText, className = "" }: { refText: string; className?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`cursor-pointer text-left underline decoration-brass/40 decoration-dotted underline-offset-2 hover:decoration-brass print:no-underline ${className}`}
      >
        {refText}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-paper p-6 pb-10 shadow-xl sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[32rem] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl text-ink">{refText}</Dialog.Title>
              <Dialog.Description className="text-xs tracking-widest text-muted uppercase">
                King James Version
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="flex size-11 items-center justify-center rounded-full hover:bg-wash"
              aria-label="Close"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="mt-4">
            <VerseBody refText={refText} />
          </div>
          <a
            href={bibleGatewayUrl(refText)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-pine"
          >
            Open on BibleGateway (KJV) <ExternalLink className="size-4" aria-hidden />
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
