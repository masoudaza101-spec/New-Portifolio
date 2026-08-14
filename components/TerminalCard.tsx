"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HeroClock from "@/components/HeroClock";
import { cn } from "@/lib/utils";

type ScriptLine = {
  prompt?: boolean;
  command?: string;
  text?: string;
  image?: boolean;
  indent?: boolean;
  className?: string;
};

const SCRIPT: ScriptLine[] = [
  { prompt: true, command: "whoami" },
  { text: "aza@masoud — Full-Stack Developer", className: "text-foreground" },
  { prompt: true, command: "cat bio.txt" },
  { text: "Information Systems graduate building", indent: true },
  { text: "web + mobile products, start to finish.", indent: true },
  { prompt: true, command: "ls ./stack" },
  { text: "Next.js  React  TypeScript  Node  Android", indent: true, className: "text-[var(--accent-cyan)]" },
  { prompt: true, command: "./availability --status" },
  { text: "OK — open to selected projects", indent: true, className: "text-[var(--accent-green)]" },
  { prompt: true, command: "open avatar.jpg" },
  { image: true },
];

const CHAR_DELAY = 42;
const LINE_PAUSE = 420;

export default function TerminalCard({ projectsCount }: { projectsCount: number }) {
  const reduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const line = SCRIPT[visibleLines];
    if (!line) {
      return;
    }

    if (line.command) {
      if (typed < line.command.length) {
        const timer = setTimeout(() => setTyped((n) => n + 1), CHAR_DELAY);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(
        () => {
          setTyped(0);
          setVisibleLines((n) => n + 1);
        },
        line.prompt && visibleLines === SCRIPT.length - 2 ? 200 : LINE_PAUSE
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setVisibleLines((n) => n + 1), LINE_PAUSE);
    return () => clearTimeout(timer);
  }, [visibleLines, typed, reduceMotion]);

  const renderLine = (line: ScriptLine, index: number) => {
    const isTyping = index === visibleLines;
    const isCommand = Boolean(line.command);

    if (line.image) {
      return (
        <motion.div
          key={`line-${index}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="pt-2"
        >
          <Image
            src="/images/profile.jpg"
            alt="Professional portrait of Aza Masoud"
            width={288}
            height={384}
            priority
            className="mx-auto aspect-[3/4] w-40 rounded-xl border border-white/10 object-cover object-top shadow-glow-gold"
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`line-${index}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={cn("flex items-baseline gap-2 font-mono text-[13px] leading-7 md:text-sm", line.indent && "pl-6")}
      >
        {line.prompt ? (
          <span className="shrink-0 text-muted-foreground" aria-hidden="true">
            ›
          </span>
        ) : (
          <span className="shrink-0 text-muted-foreground">└</span>
        )}
        {isCommand ? (
          <span className="text-foreground">
            {reduceMotion ? line.command : line.command!.slice(0, typed)}
            {isTyping && !reduceMotion && <span className="terminal-caret" aria-hidden="true" />}
          </span>
        ) : (
          <span className={cn("text-muted-foreground", line.className)}>{line.text}</span>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(0,212,255,0.12),transparent_65%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-card/80 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-3 rounded-full bg-[var(--accent-gold)]" />
            <span className="size-3 rounded-full bg-[var(--accent-cyan)]" />
            <span className="size-3 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            aza@masoud — ~/portfolio
          </span>
          <HeroClock />
        </div>

        <div className="min-h-[21rem] space-y-0.5 px-5 py-5 md:min-h-[22rem]">
          {SCRIPT.slice(0, reduceMotion ? SCRIPT.length : visibleLines).map((line, index) =>
            renderLine(line, index)
          )}

          {(reduceMotion || visibleLines >= SCRIPT.length) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-mono text-[13px] text-muted-foreground md:text-sm"
            >
              <span className="text-[var(--accent-gold)]">
                {projectsCount} projects in repo
              </span>
              <span className="terminal-caret" aria-hidden="true" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
