import React from "react";

export default function PopupChips({ label, items }) {
  if (!items.length) return null;
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ochre">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span key={i.key} className="rounded-full bg-sand px-2.5 py-1 text-xs leading-none text-ink">{i.text}</span>
        ))}
      </div>
    </div>
  );
}
