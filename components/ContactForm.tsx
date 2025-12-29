"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mbdjqwor", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        />
      </div>

      <textarea
        name="message"
        required
        placeholder="Message"
        rows={6}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm tracking-[0.25em] uppercase text-white/90 hover:border-white/25 hover:bg-white/15 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {status === "success" && (
        <p className="text-sm text-white/70">Message sent. I’ll get back soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-white/70">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
