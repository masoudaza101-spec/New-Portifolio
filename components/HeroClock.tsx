"use client";

import { useSyncExternalStore } from "react";

const TIME_ZONE = "Africa/Dar_es_Salaam";

const subscribe = (onStoreChange: () => void) => {
  const timer = setInterval(onStoreChange, 1000);
  return () => clearInterval(timer);
};

const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;

export default function HeroClock() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const date = new Date(now * 1000);

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: TIME_ZONE,
  });

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  });

  return (
    <span className="tabular-nums">
      {time} <span className="text-muted-foreground">EAT</span>
      <span className="hidden text-muted-foreground sm:inline"> · {day}</span>
    </span>
  );
}
