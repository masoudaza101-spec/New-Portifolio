"use client";

import { useEffect, useState } from "react";
import { roles } from "@/data/site";

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setDeleting(true);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      deleting ? 40 : text === current ? 1800 : 90
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
      <span className="text-gradient-gold">{text}</span>
      <span className="typewriter-caret ml-1 inline-block h-[1.1em] w-[3px] translate-y-1" />
    </span>
  );
}
