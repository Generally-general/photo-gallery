import { memo } from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6 max-w-md">
      <label
        htmlFor="search"
        className="mb-1.5 block text-[13px] font-semibold text-text-primary"
      >
        Search by author
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="e.g. Alejandro"
        autoComplete="off"
        className="h-11 w-full rounded-standard border border-border bg-surface px-3 text-[12px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
      />
    </div>
  );
}

export default memo(SearchBar);
