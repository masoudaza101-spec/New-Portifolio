export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const blurDataUrl =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201%201'%3E%3Crect%20width='1'%20height='1'%20fill='%23111111'/%3E%3C/svg%3E";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
