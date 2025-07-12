import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from '@/lib/utils';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}