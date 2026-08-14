export const constants = {
  countryCodes: ["+84", "+1", "+65", "+81", "+82"],
};

export const PRIORITY_META: Record<number, { key: string; label: string }> = {
  1: { key: "verylow", label: "Very Low" },
  2: { key: "low", label: "Low" },
  3: { key: "medium", label: "Medium" },
  4: { key: "high", label: "High" },
  5: { key: "veryhigh", label: "Very High" },
};

export const STATUS_STYLES: Record<string, string> = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-700/30 dark:text-amber-300",
  in_progress:
    "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300",
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-700/30 dark:text-emerald-300",
};
