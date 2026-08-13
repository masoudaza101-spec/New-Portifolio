"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";
import type { ReactNode } from "react";

const subscribe = () => () => {};

export default function PageTransition({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();

  if (!enabled) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
