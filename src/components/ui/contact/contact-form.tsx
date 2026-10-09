import { useState, FormEvent } from "react";
import { TerminalWindow } from "../terminal";

const field =
  "w-full border-0 border-b border-border bg-transparent px-0 py-1.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <TerminalWindow title="ssh hello@ItsMeDAN — 80×24" className="w-full max-w-md justify-self-center md:justify-self-end">
      {submitted ? (
        <div className="space-y-2 p-6 text-sm">
          <p className="text-muted-foreground">$ send --to dan</p>
          <p className="text-primary">[ok] message delivered.</p>
          <p className="text-muted-foreground">Thanks for reaching out, I&apos;ll get back to you soon.</p>
          <p className="cursor text-primary">exit 0</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 p-6 text-sm">
          <p className="text-muted-foreground">
            <span className="text-primary">#</span> Got a question or a project in mind? Drop a line.
          </p>
          <label className="block space-y-1">
            <span className="text-accent">&gt; name:</span>
            <input name="name" placeholder="your name" required className={field} />
          </label>
          <label className="block space-y-1">
            <span className="text-accent">&gt; email:</span>
            <input name="email" type="email" placeholder="you@example.com" required className={field} />
          </label>
          <label className="block space-y-1">
            <span className="text-accent">&gt; message:</span>
            <textarea name="message" rows={4} placeholder="tell me what you're building..." required className={`${field} resize-none`} />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-primary bg-primary py-2.5 font-bold text-primary-foreground transition hover:bg-transparent hover:text-primary disabled:opacity-60"
          >
            {isSubmitting ? "transmitting..." : "$ send --to dan"}
          </button>
        </form>
      )}
    </TerminalWindow>
  );
}

export default ContactForm;
