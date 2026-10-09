import { useState, FormEvent } from "react";
import { TerminalWindow } from "../terminal";
import { CopyDiscord } from "../../layout/footer";

// Delivered via FormSubmit (no backend/API key). The very first submission triggers
// a one-time activation email to this address; messages arrive after clicking "Activate".
const CONTACT_EMAIL = "danielputrarywandisa@gmail.com";

const field =
  "w-full border-0 border-b border-border bg-transparent px-0 py-1.5 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary";

type Status = "idle" | "sending" | "sent" | "error";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          _subject: "New message from your portfolio",
          _template: "table",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || `HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error");
      setStatus("error");
    }
  };

  return (
    <TerminalWindow title="ssh hello@ItsMeDAN — 80×24" className="w-full max-w-md justify-self-center md:justify-self-end">
      {status === "sent" ? (
        <div className="space-y-2 p-6 text-sm">
          <p className="text-muted-foreground">$ send --to dan</p>
          <p className="text-primary">[ok] message delivered.</p>
          <p className="text-muted-foreground">Thanks for reaching out, I&apos;ll get back to you soon.</p>
          <button type="button" onClick={() => setStatus("idle")} className="cursor text-primary hover:underline">
            ./send-another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 p-6 text-sm">
          <p className="text-muted-foreground">
            <span className="text-primary">#</span> Got a question or a project in mind? Drop a line.
          </p>
          {/* honeypot: bots fill it, FormSubmit drops those submissions */}
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <label className="block space-y-1">
            <span className="text-accent">&gt; name:</span>
            <input name="name" placeholder="your name" required maxLength={100} className={field} />
          </label>
          <label className="block space-y-1">
            <span className="text-accent">&gt; email:</span>
            <input name="email" type="email" placeholder="you@example.com" required maxLength={200} className={field} />
          </label>
          <label className="block space-y-1">
            <span className="text-accent">&gt; message:</span>
            <textarea name="message" rows={4} placeholder="tell me what you're building..." required maxLength={5000} className={`${field} resize-none`} />
          </label>
          {status === "error" && (
            <p className="text-foreground" role="alert">
              [err] failed to send: {error}. try again, or ping me on discord.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full border border-primary bg-primary py-2.5 font-bold text-primary-foreground transition hover:bg-transparent hover:text-primary disabled:opacity-60"
          >
            {status === "sending" ? "transmitting..." : "$ send --to dan"}
          </button>
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-muted-foreground">
            <span>
              <span className="text-primary">#</span> or ping me on discord
            </span>
            <CopyDiscord showHandle />
          </div>
        </form>
      )}
    </TerminalWindow>
  );
}

export default ContactForm;
